import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import Hash from '@ioc:Adonis/Core/Hash'
import UserService from 'App/Services/User'
import TokenService from 'App/Services/Token'
import UserActivitiesService from 'App/Services/UserActivities'
import { DateTimeNowISO } from 'App/Helpers/Date'

interface ReponseInterface {
  userCode: string
  token: string
  expires_token: string
}

export default class AuthenticationLoginController {
  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      const { username, password } = request.body()
      if (!username || !password) throw new Error('Invalid Username Or Password')
      const userData = await this.validateUsernameAndPassword(username, password)
      // const clientData = await this.getClientAdminInformation(userData.code)
      // const companyData = await this.getCompanyInformation(userData.companyCode)
      const jwtAuth = await auth.use('api').generate(userData, { expiresIn: '1d' })
      const mapData = this.mapDataForResponse({
        user: userData,
        jwt: jwtAuth,
        // client: clientData,
        // company: companyData,
      })
      response.apiCollection(mapData)
      await this.createActivityLog(userData.code)
      await this.saveTokenData(userData, jwtAuth)
      Event.emit('user:login', {
        contents: [
          ['', 'Username: ' + username],
          ['', 'IP: ' + request.ip()],
          ['', 'Login Date: ' + DateTimeNowISO()],
          ['User Agent', request.header('user-agent')],
          ['Referer', request.header('referer')],
        ],
      })
    } catch (err) {
      response.apiError(err)
    }
  }

  private async saveTokenData(userData, jwtAuth) {
    const token = new TokenService()
    await token.createToken(userData, jwtAuth)
  }

  protected async validateUsernameAndPassword(username: string, password: string) {
    try {
      const us = new UserService()
      const data = await us.getUserByUsername(username)
      if (!data) throw new Error('Invalid Username Or Password')
      if (data.status !== 'active') {
        us.validateStatus(data.status)
      }
      const passwordFromDB = data?.password
      if (!(await Hash.use('md5').verify(passwordFromDB, password)))
        throw new Error('Invalid Username Or password')
      return data
    } catch (err) {
      throw err
    }
  }

  protected async createActivityLog(userCode: string): Promise<void> {
    try {
      const uac = new UserActivitiesService()
      await uac.createActivity('login', userCode, '{}')
    } catch (err) {
      throw err
    }
  }
  protected mapDataForResponse(data: any): ReponseInterface {
    const objectResponse = {} as ReponseInterface
    objectResponse.userCode = data.user?.userCode
    objectResponse.token = data.jwt?.token
    objectResponse.expires_token = data.jwt?.expiresIn

    return objectResponse
  }
}
