import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/User'
import { UserAccountsInterface } from 'App/Interfaces/MysqlModels'

export default class UserAccountsInfoController {
  public async handle({ request, response }: HttpContextContract): Promise<void> {
    try {
      const { userCode } = request.qs()
      const data = await this.getUserAccountInfo(userCode)
      response.apiCollection(data)
    } catch (err) {
      response.apiError(err)
    }
  }

  private async getUserAccountInfo(userCode: UserAccountsInterface['code']): Promise<object> {
    try {
      const us = new UserService()
      const data = us.getUserInfo(userCode)
      return data
    } catch (err) {
      throw err
    }
  }
}
