import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/User'

export default class Delete {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const { userCode } = request.body()
      await this.deleteUser(userCode)
      response.apiCollection({})
    } catch (err) {
      response.apiError(err)
    }
  }

  private async deleteUser(userCode) {
    try {
      const us = new UserService()
      await us.deleteUser(userCode)
      return true
    } catch (err) {
      throw err
    }
  }
}
