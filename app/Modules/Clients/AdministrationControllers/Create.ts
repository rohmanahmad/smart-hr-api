import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientServie from 'App/Services/Clients'

export default class Create {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const { subscriptionCode } = request.body()
      const clientCode = await this.createClient({ subscriptionCode })
      response.apiCollection({ code: clientCode })
    } catch (err) {
      throw response.apiError(err)
    }
  }

  private async createClient({ subscriptionCode }) {
    try {
      const cs = new ClientServie()
      const clientCode = await cs.createClient({ subscriptionCode })
      return clientCode
    } catch (err) {
      throw err
    }
  }
}
