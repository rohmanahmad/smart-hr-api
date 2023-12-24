import uniq from 'lodash.uniq'
import { ValidInput, AvailableInput } from 'App/Interfaces/Inputs'
import {
  ProjectSplitter,
  StringToArrayInt,
  StringToArrayString,
  MapServiceCategory,
} from 'App/Helpers/Utilities'
import { DateTimeBuilder } from 'App/Helpers/Date'

export default class Input {
  public input: AvailableInput
  public validInput: ValidInput
  private socialMediaOnly: Array<string>

  constructor(input: object) {
    this.input = input
  }

  public setSocialMediaOnly(): typeof this {
    this.socialMediaOnly = ['twitter', 'facebook', 'instagram', 'youtube', 'tiktok']
    return this
  }

  public getValidInput(): ValidInput {
    const {
      project,
      since,
      until,
      service_category: serviceCategory,
      section,
      author,
      username,
      domain,
      taging,
      q,
      filterbot,
      locations,
      location_kab_kota: kabKota,
      type,
      group_service: groupService,
      filter_by: filterBy,
      show_total: showTotal,
      timesince,
      timeuntil,
      limit,
      page = '1',
      compare,
    } = this.input
    this.validInput = {}
    if (project) this.validInput.project = uniq(ProjectSplitter(project))
    if (since) this.validInput.since = DateTimeBuilder(since, timesince + ':00')
    if (until) this.validInput.until = DateTimeBuilder(until, timeuntil + ':59')
    if (serviceCategory)
      this.validInput.serviceCategory = uniq(
        MapServiceCategory(StringToArrayInt(serviceCategory), this.socialMediaOnly)
      )
    if (section) this.validInput.section = uniq(StringToArrayString(section))
    if (author) this.validInput.author = uniq(StringToArrayString(author))
    if (username) this.validInput.username = uniq(StringToArrayString(username))
    if (domain) this.validInput.domain = uniq(StringToArrayString(domain))
    if (taging) this.validInput.taging = uniq(StringToArrayString(taging))
    if (q) this.validInput.q = q?.trim()
    if (filterbot) this.validInput.filterbot = filterbot === 'true'
    if (locations) this.validInput.locations = uniq(StringToArrayString(locations))
    if (kabKota) this.validInput.locationKabKota = uniq(StringToArrayString(kabKota))
    if (type) this.validInput.type = type
    if (groupService) this.validInput.groupService = groupService === 'true'
    if (filterBy) {
      this.validInput.filterBy =
        ['mention', 'reach', 'engagement', 'unique_author'].indexOf(filterBy) > -1
          ? filterBy
          : 'mention'
    }
    if (showTotal) this.validInput.showTotal = showTotal === 'true'
    if (limit) {
      this.validInput.limit = parseInt(limit)
      this.validInput.page = parseInt(page)
      if (page) this.validInput.skip = (parseInt(page) - 1) * this.validInput.limit
    }
    if (compare) this.validInput.compare = compare === 'true'
    return this.validInput
  }
}
