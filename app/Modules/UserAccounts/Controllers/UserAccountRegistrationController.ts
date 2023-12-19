import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/User'
import CompanyService from 'App/Services/Company'
import ClientServie from 'App/Services/Clients'

export default class UserAccountRegistrationController {
  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      const { email, username, companyName, password, confirmPassword } = request.body()
      await this.doRegister({ email, username, companyName, password, confirmPassword })
      response.apiSuccess({})
    } catch (err) {
      response.apiError(err)
    }
  }

  /* tidak boleh ada public function (hanya boleh private function saja) */

  private async doRegister({
    email,
    username,
    companyName,
    password,
    confirmPassword,
  }): Promise<boolean> {
    try {
      await this.validateUserInput({ email, username, password, confirmPassword, companyName })
      const clientId = await this.createClient()
      // const companyId = await this.createCompany(clientId, companyName)
      // await this.createUserAccount({ email, username, password, companyId })
      return true
    } catch (err) {
      throw err
    }
  }
  private async validateUserInput({ email, username, password, confirmPassword, companyName }) {
    try {
      if (password !== confirmPassword) throw new Error("Password Doesn't match")
      const us = new UserService()
      await us.validateEmailIfExists(email)
      await us.validateUsernameIfExists(username)
      us.validatePassword(password)
      const cs = new CompanyService()
      cs.validateCompanyName(companyName)
    } catch (err) {
      throw err
    }
  }
  private async createUserAccount({ email, username, password, companyId }): Promise<void> {
    try {
      const us = new UserService()
      await us.createNewData({ email, username, password, companyId })
    } catch (err) {
      throw err
    }
  }
  private async createClient(): Promise<number> {
    try {
      const cs = new ClientServie()
      const clientId = await cs.createNewClient()
      return clientId
    } catch (err) {
      throw err
    }
  }
  private async createCompany(clientId: number, companyName: string): Promise<number> {
    try {
      const cs = new CompanyService()
      const companyId = await cs.createNewCompany(clientId, companyName)
      return companyId
    } catch (err) {
      throw err
    }
  }
}
