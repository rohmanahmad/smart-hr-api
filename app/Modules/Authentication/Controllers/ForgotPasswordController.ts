import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import moment from 'moment'

export default class ForgotPasswordController {
  public async handle({ request, response }: HttpContextContract) {
    try {
      const { email } = request.body()
      if (!email) throw new Error('Invalid Email')
      await this.resendEmailConfirmation(email)
      response.apiSuccess({})
      Event.emit('user:forgot-password', {
        contents: [
          ['', 'email: ' + email],
          ['', 'IP: ' + request.ip()],
          ['', 'Login Date: ' + moment().format('YYYY-MM-DD HH:mm:ss')],
          ['User Agent', request.header('user-agent')],
          ['Referer', request.header('referer')],
        ],
      })
    } catch (err) {
      response.apiError(err)
    }
  }

  private async resendEmailConfirmation(email: string): Promise<void> {}
}
