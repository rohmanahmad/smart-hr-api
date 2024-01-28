import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientServie from 'App/Services/Clients'

export default class Delete {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const { clientCode } = request.body()
      await this.deleteClient(clientCode)
      response.apiCollection({})
    } catch (err) {
      throw err
    }
  }

  private async deleteClient(clientCode: string): Promise<boolean> {
    try {
      const cs = new ClientServie()
      await cs.deleteClient(clientCode)
      return true
    } catch (err) {
      throw err
    }
  }
}
