import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientServie from 'App/Services/Clients'

export default class Update {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const { code } = request.body()
      await this.updateClient(code, request.body())
      response.apiCollection({})
    } catch (err) {
      throw err
    }
  }

  private async updateClient(code: string, input: object): Promise<boolean> {
    const cs = new ClientServie()
    await cs.updateClientByCode(code, input)
    return true
  }
}
