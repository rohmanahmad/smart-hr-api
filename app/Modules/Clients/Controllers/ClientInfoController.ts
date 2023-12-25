import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientService from 'App/Services/Clients'

export default class ClientinfoController {
  public async handle({ request, response }: HttpContextContract): Promise<void> {
    try {
      const { clientCode } = request.qs()
      const data = await this.getClientInfo(clientCode)
      response.apiCollection(data)
    } catch (err) {
      response.apiError(err)
    }
  }

  private async getClientInfo(clientCode: string): Promise<object> {
    try {
      const cs = new ClientService()
      const data = await cs.getClientInfoByCode(clientCode)
      return data
    } catch (err) {
      throw err
    }
  }
}
