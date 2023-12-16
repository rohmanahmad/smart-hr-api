import { AuthUser } from 'App/Interfaces'
import { ValidInput } from 'App/Interfaces/Inputs'
import { ValidMatch } from 'App/Interfaces/Streams'
import uniq from 'lodash.uniq'
import moment from 'moment'
import PackageRestrictionService from 'App/Services/PackageRestriction'

import ProjectService from 'App/Services/Projects'
import { DateTime } from 'luxon'

export default class StreamMatch {
  public validMatch: ValidMatch
  public validInput: ValidInput
  private auth: AuthUser

  public setInput(requestInput: ValidInput): typeof this {
    this.validInput = requestInput
    return this
  }
  public setAuth(auth: AuthUser): typeof this {
    this.auth = auth
    return this
  }

  public async getMatch(): Promise<ValidMatch> {
    await this.validateByPackageRestriction()
    this.generateMatch()
    return this.validMatch
  }

  private async validateByPackageRestriction(): Promise<void> {
    try {
      const pkgItem = await new PackageRestrictionService().getRestrictionFormat(this.auth)
      if (pkgItem.channels.length > 0)
        this.validInput.serviceCategory = this.validInput.serviceCategory?.filter(
          (x) => pkgItem.channels?.indexOf(x) > -1
        )
      const comparisonProjectIds = pkgItem.comparisonProjects?.map((x) => x.keyId)
      const acceptedProjects = pkgItem.ownedProjects
        ?.map((x) => x.keyId)
        ?.concat(comparisonProjectIds)
      this.validInput.project = this.validInput.project?.filter(
        (x) => acceptedProjects?.indexOf(x) > -1
      )
      if (this.validInput.project && this.validInput.project.length === 0)
        throw new Error('Invalid Project Id')
      if (pkgItem.dateLimit) {
        if (this.validInput.since && this.validInput.since > pkgItem.dateLimit)
          this.validInput.since = DateTime.fromJSDate(pkgItem.dateLimit)
            .set({ hour: 0, minute: 0, second: 0 })
            .toJSDate()
        if (this.validInput.until && this.validInput.until > pkgItem.dateLimit)
          this.validInput.since = DateTime.fromJSDate(pkgItem.dateLimit)
            .set({ hour: 23, minute: 59, second: 59 })
            .toJSDate()
      }
    } catch (err) {
      throw err
    }
  }

  private generateMatch(): void {
    try {
      this.validMatch = {
        keyword: { $in: this.validInput.project },
        date: {
          $gte: this.validInput.since,
          $lte: this.validInput.until,
        },
        service: { $in: this.validInput.serviceCategory },
        is_trash: {
          $ne: true,
        },
      }
      this.addSectionToValidMatch()
      this.addAuthorToValidMatch()
      this.addFilterbotToValidMatch()
      this.addDomainToValidMatch()
      this.addSearchContentToValidMatch()
      this.addProvinceToValidMatch()
      this.addKabKotaToValidMatch()
      this.addTaggingToValidMatch()
    } catch (err) {
      throw err
    }
  }

  private addTaggingToValidMatch(): void {
    const taggings = this.validInput.taging || []
    if (taggings.length > 0) {
      this.validMatch['tags'] = { $in: taggings }
    }
  }

  private addProvinceToValidMatch(): void {
    const provinces = this.validInput.locations
    if (provinces && provinces.length > 0) {
      this.validMatch['geo_detail.prov_id'] = { $in: provinces }
    }
  }

  private addKabKotaToValidMatch(): void {
    const kabKota = this.validInput.locationKabKota
    if (kabKota && kabKota.length > 0) {
      this.validMatch['geo_detail.kab_id'] = { $in: kabKota }
    }
  }

  private addDomainToValidMatch(): void {
    const domains = this.validInput.domain
    if (domains) {
      const excludeDomains = domains
        .filter((x) => x.indexOf('-') === 0)
        .map((x) => new RegExp(x, 'i'))
      const includeDomains = domains
        .filter((x) => x.indexOf('-') === -1)
        .map((x) => new RegExp(x, 'i'))
      if (includeDomains.length > 0 || excludeDomains.length > 0) {
        this.validMatch['source'] = { $in: [], $nin: [] }
        if (includeDomains.length > 0) this.validMatch['source'].$in = includeDomains
        if (excludeDomains.length > 0) this.validMatch['source'].$nin = excludeDomains
      }
    }
  }

  private addSectionToValidMatch(): void {
    const mapSections = {
      negative: -1,
      positive: 1,
      neutral: 0,
    }
    const keySections = Object.keys(mapSections)
    if (this.validInput.section) {
      const section = this.validInput.section.filter((x) => keySections.indexOf(x) > -1)
      if (section.length > 0 && section.length < 3)
        this.validMatch['sentiment.value'] = { $in: section.map((x) => mapSections[x]) }
    }
  }

  private addAuthorToValidMatch(): void {
    const author = this.validInput.author // user.real_name
    const usernames = this.validInput.username // user.name
    if (author && author.length > 0)
      this.validMatch['user.real_name'] = { $in: author.map((x) => x.trim()) }
    if (usernames && usernames.length > 0)
      this.validMatch['user.name'] = { $in: usernames.map((x) => x.trim()) }
  }

  private async addFilterbotToValidMatch(): Promise<void> {
    try {
      if (this.validInput.filterbot) {
        const authors = await new ProjectService().getBotUsers(this.validMatch.keyword.$in)
        if (authors && authors.length > 0)
          this.validMatch['user.name'] = { $nin: authors.map((x) => x.trim()) }
      }
    } catch (err) {
      throw err
    }
  }

  private addSearchContentToValidMatch(): void {
    const search: string = this.validInput.q || ''
    if (search) {
      let value = search.trim()
      const arrayTextOR: Array<string> = uniq(value.split(/ or /i))
      const arrayTextAND: Array<string> = uniq(value.split(/ and /i))
      let text: Array<RegExp> = []
      if (arrayTextOR.length <= 1 && arrayTextAND.length <= 1) {
        if (value.startsWith('"')) {
          let v = value.replace(/\"/g, '')
          let rg = new RegExp(`\\b${v}\\b`, 'im')
          if (v.startsWith('-')) {
            v = v.replace('-', '')
            rg = new RegExp(`\\b^((?!${v}).)*$\\b`, 'mi')
          }
          text.push(rg)
        } else {
          let rg = new RegExp(value.trim(), 'im')
          if (value.startsWith('-')) {
            value = value.replace('-', '')
            rg = new RegExp(`^((?!${value.trim().replace(/"/g, '')}).)*$`, 'mi')
          }
          text.push(rg)
        }
        this.validMatch.text = { $in: text }
      } else if (arrayTextOR.length > 1) {
        text = arrayTextOR.map((x) => {
          let rg = new RegExp(x.trim(), 'im')
          if (x.startsWith('"')) {
            x = x.trim().replace(/"/g, '')
            rg = new RegExp(`\\b${x}\\b`, 'im')
            if (x.startsWith('-')) {
              x = x.replace('-', '')
              rg = new RegExp(`\\b^((?!${x}).)*$\\b`, 'mi')
            }
          } else {
            if (x.startsWith('-')) {
              x = x.replace('-', '')
              rg = new RegExp(`^((?!${x}).)*$`, 'mi')
            }
          }
          return rg
        })
        this.validMatch.text = {
          $in: text,
        }
      } else if (arrayTextAND.length > 1) {
        text = arrayTextAND.map((x) => {
          let rg = new RegExp(x.trim(), 'im')
          if (x.startsWith('"')) {
            x = x.trim().replace(/"/g, '')
            rg = new RegExp(`\\b${x}\\b`, 'im')
            if (x.startsWith('-')) {
              x = x.replace('-', '')
              rg = new RegExp(`^((?!${x}).)*$`, 'mi')
            }
          } else {
            if (x.startsWith('-')) {
              x = x.replace('-', '')
              rg = new RegExp(`^((?!${x}).)*$`, 'mi')
            }
          }
          return rg
        })
        this.validMatch.text = {
          $all: text,
        }
      }
    }
  }

  public getCompareCriteriaByDate(oldCriteria: ValidMatch): ValidMatch {
    try {
      const since = moment(oldCriteria.date.$gte)
      const until = moment(oldCriteria.date.$lte)
      const diff = until.diff(since, 'd')
      return {
        ...oldCriteria,
        date: {
          $gte: since.subtract(diff, 'd').toDate(),
          $lte: until.subtract(diff, 'd').toDate(),
        },
      }
    } catch (err) {
      throw err
    }
  }
}
