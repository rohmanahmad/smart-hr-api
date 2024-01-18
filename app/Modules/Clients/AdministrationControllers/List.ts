import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientServie from 'App/Services/Clients'

export default class List {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const data = await this.clientAdminList()
      response.apiCollection({ data })
    } catch (err) {
      throw err
    }
  }

  private async clientAdminList() {
    try {
      const cs = new ClientServie()
      const data = await cs.clientAdminList()
      return data
    } catch (err) {
      throw err
    }
  }
}
