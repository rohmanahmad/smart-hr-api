import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/User'

export default class UserAccountRegistrationController {
  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      const { email, username, password, confirmPassword } = request.body()
      await this.doRegister({ email, username, password, confirmPassword })
      response.apiSuccess({})
    } catch (err) {
      response.apiError(err)
    }
  }

  /* tidak boleh ada public function (hanya boleh private function saja) */

  private async doRegister({ email, username, password, confirmPassword }): Promise<boolean> {
    try {
      if (password !== confirmPassword) throw new Error("Password Doesn't match")
      const us = new UserService()
      const data = await us.createNewData({ email, username, password })
      return data
    } catch (err) {
      throw err
    }
  }
}
