import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateDepartementController {
  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      response.apiSuccess({})
    } catch (err) {
      response.apiError(err)
    }
  }
}
