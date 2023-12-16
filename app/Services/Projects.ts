import uniqByLodash from 'lodash.uniq'
import sumLodash from 'lodash.sum'
import { ProjectsAndComparedProjectByUser, ProjectDetail } from 'App/Interfaces'
import UserModel from 'App/Models/Mysql/UserAccounts'
import KeywordModel from 'App/Models/Mysql/RippleKeyword'
import KeywordCompareModel from 'App/Models/Mysql/RippleKeywordCompare'
import { StringToArrayInt, StringToArrayString } from 'App/Helpers/Utilities'

export default class ProjectService {
  public async getActiveProjectsByClientId(
    clientId: number,
    fields: string[] = ['*']
  ): Promise<KeywordModel[]> {
    try {
      const data = await KeywordModel.query()
        .select(fields)
        .where('key_client_id', clientId)
        .where('key_status', 1)
        .where('is_trash', 0)
      return data || []
    } catch (err) {
      throw err
    }
  }

  public async getProjectDetails(
    projectIds: Array<number>,
    fields: Array<string>
  ): Promise<KeywordModel[]> {
    try {
      const dataProjects = await KeywordModel.query()
        .whereIn('key_id', projectIds)
        .select(fields || '*')
      const data = dataProjects.map((x) => x.serialize()) as Array<KeywordModel>
      return data
    } catch (err) {
      throw err
    }
  }

  public async getCompareProject(userKeywords: Array<number>): Promise<Array<number>> {
    try {
      const queryDataCompare = await KeywordCompareModel.query()
        .select(['compare_key_id', 'compare_comp_key_id'])
        .where('compare_status', 1)
        .whereIn('compare_key_id', userKeywords)
      const dataCompare = queryDataCompare
        .map((x) => x.serialize())
        .reduce((r, x) => {
          r.push(x.compare_comp_key_id)
          return r
        }, []) as Array<number>
      const uniqProjects = uniqByLodash(dataCompare)
      return uniqProjects
    } catch (err) {
      throw err
    }
  }

  public async getTotalProjectKeywordsByClientId(clientId: number): Promise<number> {
    try {
      const data = await this.getActiveProjectsByClientId(clientId, ['key_word'])
      const total: number = sumLodash(data.map((x) => x.keyWord?.split(',').length))
      return total
    } catch (err) {
      throw err
    }
  }

  public async getUserKeywords(userId: number): Promise<Array<number>> {
    try {
      const userkeyword: Array<UserModel> = await UserModel.query()
        .select(['user_keyword'])
        .where('user_id', userId)
        .limit(1)
      const data = userkeyword
        .map((x) => x.serialize())
        .reduce((r, x) => {
          r = r.concat(StringToArrayInt(x.userKeyword))
          return r
        }, []) as Array<number>
      return data
    } catch (err) {
      throw err
    }
  }

  public async getProjectsAndComparedProjectByUser(
    userId: number
  ): Promise<ProjectsAndComparedProjectByUser> {
    try {
      const fields = [
        'key_id',
        'key_name',
        'key_lang',
        'key_color',
        'key_client_id',
        'temporary_token',
        'key_is_cc',
        'key_is_buzzer_tracking',
        'key_is_health_index',
        'key_is_prdashboard',
      ]
      const userKeywords = await this.getUserKeywords(userId)
      const comparisonKeywords = await this.getCompareProject(userKeywords)
      const detailProjects = await this.getProjectDetails(
        userKeywords.concat(comparisonKeywords),
        fields
      )
      const ownedProjects = this.mapFromUserModelToProjectDetail(
        detailProjects.filter((x) => userKeywords.indexOf(x.keyId) > -1)
      )
      const comparisonProjects = this.mapFromUserModelToProjectDetail(
        detailProjects.filter((x) => comparisonKeywords.indexOf(x.keyId) > -1)
      )
      return { ownedProjects, comparisonProjects }
    } catch (err) {
      throw err
    }
  }

  private mapFromUserModelToProjectDetail(data: KeywordModel[]): Array<ProjectDetail> {
    try {
      const items = data.map((x) => {
        let item: ProjectDetail = { keyId: x.keyId, keyName: x.keyName }
        if (x.keyClientId) item.clientId = x.keyClientId
        if (x.keyColor) item.keyColor = x.keyColor
        if (x.keyLang) item.keyLang = x.keyLang
        if (x.keyWord) item.keyWord = StringToArrayString(x.keyWord)
        if (x.keyWordIn) item.keyInclude = StringToArrayString(x.keyWordIn)
        if (x.keyWordNot) item.keyExclude = StringToArrayString(x.keyWordNot)
        if (x.keyPositif) item.keyPositive = StringToArrayString(x.keyPositif)
        if (x.keyNegatif) item.keyNegative = StringToArrayString(x.keyNegatif)
        if (x.keySociomileId) item.keySociomileId = x.keySociomileId
        if (x.temporaryToken) item.temporaryToken = x.temporaryToken
        if (x.keyIsCc) item.keyIsCC = x.keyIsCc > 0
        if (x.keyIsBuzzerTracking) item.keyIsBuzzerTracking = x.keyIsBuzzerTracking > 0
        if (x.keyIsPrdashboard) item.keyIsPRDashboard = x.keyIsPrdashboard > 0
        if (x.keyIsHealthIndex) item.keyIsHealthIndex = x.keyIsHealthIndex > 0
        return item
      })
      return items
    } catch (err) {
      throw err
    }
  }
  public async getBotUsers(keyIds: Array<number> | undefined): Promise<Array<string> | null> {
    try {
      if (keyIds) {
        const query = await KeywordModel.query()
          .select(['acc_fb_bot', 'acc_ig_bot', 'acc_twitter_bot'])
          .whereIn('key_id', keyIds)
        const items = query
          .map((x) => x.serialize())
          .reduce((r: Array<string>, x) => {
            const fb = x.accFbBot.split(',').filter((x: string) => x.trim().length > 1)
            const tw = x.accTwitterBot.split(',').filter((x: string) => x.trim().length > 1)
            const ig = x.accIgBot.split(',').filter((x: string) => x.trim().length > 1)
            r = r.concat(fb).concat(ig).concat(tw)
            return r
          }, []) as Array<string>
        return items
      }
      return null
    } catch (err) {
      throw err
    }
  }
}
