import PackageRestrictionModel from 'App/Models/Mysql/PackageRestriction'
import { PackageRestrictionFormatted, AuthUser } from 'App/Interfaces'
import { MapServiceCategory, StringToArrayString } from 'App/Helpers/Utilities'
import ProjectService from 'App/Services/Projects'
import moment from 'moment'

export default class PackageRestrictionService {
  public async getByClientId(clientId: number): Promise<PackageRestrictionModel> {
    try {
      const data = await PackageRestrictionModel.query()
        .select('*')
        .where('client_id', clientId)
        .where('is_trash', 0)
        .first()
      const item = data?.serialize() as PackageRestrictionModel
      return item
    } catch (err) {
      throw err
    }
  }

  public async getRestrictionFormat(auth: AuthUser): Promise<PackageRestrictionFormatted> {
    try {
      const clientId = auth.userClient
      const userId = auth.userId
      const Ps = new ProjectService()
      const item = await this.getByClientId(clientId)
      const totalKeywordsByClient = await Ps.getTotalProjectKeywordsByClientId(clientId)
      const { ownedProjects, comparisonProjects } =
        await Ps.getProjectsAndComparedProjectByUser(userId)
      const keywordLeft = (item.maxNumberKeyword || 0) - totalKeywordsByClient
      const restrictionItem = {
        clientId,
        keywordLeft,
        channels: MapServiceCategory(item.channelCrawl.split(',').map((x: string) => parseInt(x))),
        pages: StringToArrayString(item.pageShow),
        ownedProjects,
        comparisonProjects,
        limitDate: item.dateLimit ? moment(item.dateLimit) : null,
      }
      return restrictionItem
    } catch (err) {
      throw err
    }
  }
}
