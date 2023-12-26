import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import UserService from 'App/Services/User'
import {
  CodeVerificationsInterface,
  UserAccountsInterface,
  TasksEmailSenderInterface,
} from 'App/Interfaces/MysqlModels'
import CodeVerificationsService from 'App/Services/CodeVerifications'
import { DateTimeNowISO } from 'App/Helpers/Date'
import TaskService from 'App/Services/Tasks'

export default class ForgotPasswordController {
  public async handle({ request, response }: HttpContextContract) {
    try {
      const { email } = request.body()
      if (!email) throw new Error('Invalid Email')
      const user = await this.getUserByEmail(email)
      const verificationCode = await this.getVerificationCode(user.code)
      await this.sendEmailVerificationTask(verificationCode, email, user)
      response.apiSuccess({ message: 'Email Has Been Sent' })
      Event.emit('user:forgot-password', {
        contents: [
          ['', 'email: ' + email],
          ['', 'IP: ' + request.ip()],
          ['', 'Login Date: ' + DateTimeNowISO()],
          ['User Agent', request.header('user-agent')],
          ['Referer', request.header('referer')],
        ],
      })
    } catch (err) {
      response.apiError(err)
    }
  }

  private async sendEmailVerificationTask(
    verificationCode: string,
    emailTo: string,
    data: object = {}
  ): Promise<void> {
    const item: TasksEmailSenderInterface = {
      id: null,
      uuid: null,
      sentAsEmail: 'no-reply@smarthr.com',
      sentAsName: 'No Reply ShartHR',
      email: emailTo,
      cc: 'default',
      bcc: 'default',
      subject: 'Confirm Your Forgot Password',
      isHTML: true,
      status: 'pending',
      templateName: 'emails.forgot-password',
      contentData: JSON.stringify({ ...data, verificationCode }),
      createdAt: DateTimeNowISO(),
      updatedAt: null,
    }
    const ts = new TaskService()
    await ts.createNewTask(item)
  }

  private async getVerificationCode(userCode: string): Promise<CodeVerificationsInterface['code']> {
    const vcs = new CodeVerificationsService()
    const code = await vcs.createNewForgotPasswordCode(userCode)
    return code
  }

  private async getUserByEmail(email: string): Promise<UserAccountsInterface> {
    try {
      const as = new UserService()
      const user = await as.getUserByEmail(email)
      as.validateStatus(user.status)
      return user
    } catch (err) {
      throw err
    }
  }
}
