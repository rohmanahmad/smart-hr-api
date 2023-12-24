import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import moment from 'moment'
import Hash from '@ioc:Adonis/Core/Hash'
import UserService from 'App/Services/User'
import Clients from 'App/Services/Clients'

interface ReponseInterface {
  id: number
  avatar: string
  token: string
  expires_token: string
}

export default class AuthenticationLoginController {
  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      const { username, password } = request.body()
      if (!username || !password) throw new Error('Invalid Username Or Password')
      const userData = await this.validateUsernameAndPassword(username, password)
      const clientData = await this.getClientAdminInformation(userData.code)
      const companyData = await this.getCompanyInformation()
      await this.updateLastLogin(username)
      const jwtAuth = await auth
        .use('api')
        .generate(userData, { expiresIn: userData.tokenExpired || '1d' })
      const mapData = this.mapDataForResponse({ ...userData, jwtAuth })
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

  private async getClientAdminInformation(userCode: string): Promise<object | null> {
    try {
      const ca = new Clients()

      return null
    } catch (err) {
      throw err
    }
  }

  protected async validateUsernameAndPassword(username: string, password: string) {
    try {
      const us = new UserService()
      const data = await us.getUserByUsername(username)
      if (!data) throw new Error('Invalid Username Or Password')
      if (data.status !== 'active') {
        switch (data.status) {
          case 'pending-confirmation':
            throw new Error('Account Need To Be Confirmation')
          case 'blocked':
            throw new Error('Account Was Blocked')
          case 'suspend':
            throw new Error('Account Suspended')
        }
      }
      const passwordFromDB = data?.password
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
  protected mapDataForResponse(data: any): ReponseInterface {
    const objectResponse = {} as ReponseInterface
    objectResponse.id = data.userData?.userId
    objectResponse.avatar = data.userData?.userPhoto || 'no-image.png'
    objectResponse.token = data.jwtAuth?.token
    objectResponse.expires_token = data.jwtAuth?.expiresIn

    return objectResponse
  }
}
