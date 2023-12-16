import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserAccountRegistrationController {
  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      const { email, username, password, confirmPassword } = request.body()
      response.apiSuccess({})
    } catch (err) {
      response.apiError(err)
    }
  }
}
