import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserAdminService from 'App/Services/UserAdmin'

export default class AuthenticationAdminLoginController {
  public async handle({ request, response }: HttpContextContract) {
    try {
      const { userAdmin, password } = request.body()
      if (!userAdmin || !password) throw new Error('Invalid User Admin Or Password')
      const userAdminData = await this.validateUserAdminAndPassword(userAdmin, password)
      response.apiCollection({})
    } catch (err) {
      response.apiError(err)
    }
  }

  private async validateUserAdminAndPassword(userAdmin: string, password: string) {
    try {
      const ua = new UserAdminService()
      const data = await ua.getUserAdmin(userAdmin)
      if (!data) throw new Error('Invalid User Admin Or Password')
      const passwordFromDB = data?.password
      if (!(await Hash.verify(passwordFromDB, password)))
        throw new Error('Invalid Username Or password')
      return data
    } catch (err) {
      throw err
    }
  }
}
