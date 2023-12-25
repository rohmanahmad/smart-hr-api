import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientServie from 'App/Services/Clients'

export default class UpdateClientInfoController {
  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      const { code } = request.body()
      await this.updateClientByCode(code, request.body())

      response.apiSuccess({})
    } catch (err) {
      response.apiError(err)
    }
  }

  private async updateClientByCode(code: string, input: object): Promise<boolean> {
    const cs = new ClientServie()
    await cs.updateClientByCode(code, input)
    return true
  }
}
