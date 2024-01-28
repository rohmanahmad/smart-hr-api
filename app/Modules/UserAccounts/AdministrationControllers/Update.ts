import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/User'

export default class Update {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const { code } = request.body()
      await this.updateUser(code, request.body())
      response.apiCollection({})
    } catch (err) {
      throw err
    }
  }

  private async updateUser(code: string, input: object): Promise<boolean> {
    const us = new UserService()
    await us.updateUser(code, input)
    return true
  }
}
