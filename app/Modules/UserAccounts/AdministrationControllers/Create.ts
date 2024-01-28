import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/User'

export default class Create {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const { companyCode, email, username, password, confirmPassword } = request.body()
      if (password !== confirmPassword) throw new Error("Password Doesn'n Match")
      const userCode = await this.createUserAccount({ companyCode, email, username, password })
      response.apiCollection({ code: userCode })
    } catch (err) {
      response.apiError(err)
    }
  }

  private async createUserAccount({ companyCode, email, username, password }): Promise<string> {
    try {
      const us = new UserService()
      const userCode = await us.createNewData({ companyCode, email, username, password })
      return userCode
    } catch (err) {
      throw err
    }
  }
}
