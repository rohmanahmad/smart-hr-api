import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientinfoController {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      response.apiCollection({})
    } catch (err) {
      response.apiError(err)
    }
  }
}
