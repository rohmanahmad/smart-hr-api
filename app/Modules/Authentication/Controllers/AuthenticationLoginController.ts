import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import { DateTime } from 'luxon'
import moment from 'moment'
import Hash from '@ioc:Adonis/Core/Hash'
import UserService from 'App/Services/User'
import PackageRestrictionService from 'App/Services/PackageRestriction'
import ProjectsService from 'App/Services/Projects'
import { StringToArrayInt } from 'App/Helpers/Utilities'

interface ProjectDetailInterface {
  key_id: number
  key_name: string
  time_add: DateTime
  key_client_id: number
  is_competitor: boolean
}
interface PackageRestrictionInterface {
  menu: Array<string>
  records: object
  package: string
  keyword_available: number
  keyword_used: number
  channels: string
  command_center: boolean
}
interface ReponseInterface {
  id: number
  clientid: number
  avatar: string
  token: string
  expires_token: string
  name: string
  level: number
  project: Array<ProjectDetailInterface>
  client_projects: Array<ProjectDetailInterface>
  last_logged_in: string
  package: PackageRestrictionInterface
}

export default class AuthenticationLoginController {
  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      const { username, password } = request.body()
      if (!username || !password) throw new Error('Invalid Username Or Password')
      const userData = await this.gettingUserFromUsernameAndPassword(username, password)
      await this.updateLastLogin(username)
      const packageData = await this.getPackageRestrictionByClientId(userData.userClient)
      const project = await this.getAllProjectDetailFromUserProjects(userData.userKeyword)
      const totalKeywords = await this.getTotalClientKeywords(userData.userClient)
      const data = Object.assign({ userData }, { packageData }, { project, totalKeywords })
      const jwtAuth = await auth
        .use('api')
        .generate(userData, { expiresIn: (userData.tokenExpired || 1) + 'd' })
      const mapData = this.mapDataForResponse({ ...data, jwtAuth })
      response.apiCollection(mapData)
      Event.emit('user:login', {
        contents: [
          ['', 'Username: ' + username],
          ['', 'IP: ' + request.ip()],
          ['', 'Login Date: ' + moment().format('YYYY-MM-DD HH:mm:ss')],
          ['User Agent', request.header('user-agent')],
          ['Referer', request.header('referer')],
        ],
      })
    } catch (err) {
      response.apiError(err)
    }
  }

  protected async gettingUserFromUsernameAndPassword(username: string, password: string) {
    try {
      const data = await new UserService().getInfoFromActiveUser(username)
      const passwordFromDB = data?.userPassword
      if (!(await Hash.use('md5').verify(passwordFromDB, password)))
        throw new Error('Invalid Username Or password')
      return data
    } catch (err) {
      throw err
    }
  }

  protected async updateLastLogin(username: string): Promise<void> {
    try {
      await new UserService().updateLastLoginByUsername(username)
    } catch (err) {
      throw err
    }
  }

  protected async getPackageRestrictionByClientId(clientId: number): Promise<object> {
    try {
      const packageData = await new PackageRestrictionService().getByClientId(clientId)
      return packageData
    } catch (err) {
      throw err
    }
  }

  protected async getAllProjectDetailFromUserProjects(userProjects: string): Promise<object> {
    try {
      const userKeywordArray: Array<number> = userProjects
        .split(',')
        .map((x) => Number(x))
        .filter((x) => x > 0)
      const ps = new ProjectsService()
      const dataProjects = await ps.getCompareProject(StringToArrayInt(userProjects))
      const detailProjects = await ps.getProjectDetails(dataProjects, [
        'key_id',
        'key_name',
        'time_add',
        'key_client_id',
      ])
      const mapData: Array<ProjectDetailInterface> = detailProjects.map((x) => {
        return {
          key_id: x.keyId,
          key_name: x.keyName,
          time_add: x.timeAdd,
          key_client_id: x.keyClientId,
          is_competitor: userKeywordArray.indexOf(x.keyId) === -1,
        }
      })
      return mapData
    } catch (err) {
      throw err
    }
  }

  protected async getTotalClientKeywords(clientId: number): Promise<number> {
    try {
      const dataKeywords = await new ProjectsService().getTotalProjectKeywordsByClientId(clientId)
      return dataKeywords
    } catch (err) {
      throw err
    }
  }

  protected getRemainingKeywords(max: number, current: number): number {
    return max - current
  }

  protected mapDataForResponse(data: any): ReponseInterface {
    const objectResponse = {} as ReponseInterface
    objectResponse.id = data.userData?.userId
    objectResponse.clientid = data.userData?.userClient
    objectResponse.avatar = data.userData?.userPhoto || 'no-image.png'
    objectResponse.token = data.jwtAuth?.token
    objectResponse.expires_token = data.jwtAuth?.expiresIn
    objectResponse.name = data.userData?.userName
    objectResponse.level = 0
    objectResponse.project = data.project
    objectResponse.client_projects = data.project.map((x) => ({
      key_id: x.key_id,
      key_name: x.key_name,
    }))
    objectResponse.last_logged_in = moment().format('YYYY-MM-DD HH:mm:ssss')
    const pkgRestriction = {} as PackageRestrictionInterface
    pkgRestriction.menu = data.packageData?.pageShow?.split(',')
    const maxNumberKeywords = data.packageData?.maxNumberKeyword || -1
    pkgRestriction.records = {
      max_keywords: data.packageData?.maxNumberKeyword || -1,
      max_streams: data.packageData?.maxNumberStream || -1,
      max_projects: data.packageData?.maxNumberProject || -1,
    }
    pkgRestriction.package = data.packageData?.packageName
    pkgRestriction.keyword_used = data.totalKeywords
    pkgRestriction.keyword_available =
      maxNumberKeywords > -1 ? this.getRemainingKeywords(maxNumberKeywords, data.totalKeywords) : 0
    pkgRestriction.channels = data.packageData?.channelCrawl
    pkgRestriction.command_center = data.packageData?.isCcActive
    objectResponse.package = pkgRestriction

    return objectResponse
  }
}
