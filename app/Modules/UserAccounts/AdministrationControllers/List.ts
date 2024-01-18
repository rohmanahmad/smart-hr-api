import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/User'

export default class List {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const data = await this.userAdminList()
      response.apiCollection({ data })
    } catch (err) {
      throw err
    }
  }

  private async userAdminList() {
    try {
      const us = new UserService()
      const data = await us.userAdminList()
      return data
    } catch (err) {
      throw err
    }
  }
}
