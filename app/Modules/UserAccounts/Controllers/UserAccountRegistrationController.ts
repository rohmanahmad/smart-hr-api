import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/User'
import CompanyService from 'App/Services/Company'
import ClientService from 'App/Services/Clients'
import ProfileService from 'App/Services/Profiles'
import CodeVerificationsService from '../../../Services/CodeVerifications'

type RollbackData = {
  clientCode?: string
  companyCode?: string
  profileCode?: string
  userCode?: string
  relationId?: number
}

export default class UserAccountRegistrationController {
  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      const { email, firstName, lastName, username, companyName, password, confirmPassword } =
        request.body()
      await this.doRegister({
        email,
        firstName,
        lastName,
        username,
        companyName,
        password,
        confirmPassword,
      })
      response.apiSuccess({})
    } catch (err) {
      response.apiError(err)
    }
  }

  /* tidak boleh ada public function (hanya boleh private function saja) */

  private async doRegister({
    email,
    firstName,
    lastName,
    username,
    companyName,
    password,
    confirmPassword,
  }): Promise<boolean> {
    const rollbackData: RollbackData = {}
    try {
      await this.validateUserInput({
        email,
        username,
        password,
        confirmPassword,
        companyName,
      })
      const clientCode = await this.createClient()
      rollbackData.clientCode = clientCode
      const companyCode = await this.createCompany(companyName)
      rollbackData.companyCode = companyCode
      const profileCode = await this.createProfile({ firstName, lastName })
      rollbackData.profileCode = profileCode
      const userCode = await this.createUserAccount({ companyCode, email, username, password })
      rollbackData.userCode = userCode
      const relationId = await this.createRelationClientAdmin({ userCode, clientCode })
      rollbackData.relationId = relationId
      await this.createCodeVerification(userCode)
      return true
    } catch (err) {
      await this.rollbackDataToDefault(rollbackData)
      throw err
    }
  }

  private async createCodeVerification(userCode: string): Promise<void> {
    try {
      const cv = new CodeVerificationsService()
      await cv.createNewRegistrationCode('registration', userCode)
    } catch (err) {
      throw err
    }
  }

  private async rollbackDataToDefault(rollbackData: RollbackData) {
    try {
      if (rollbackData.relationId) await this.rollbackClientRelation(rollbackData.relationId)
      if (rollbackData.userCode) await this.rollbackUser(rollbackData.userCode)
      if (rollbackData.companyCode) await this.rollbackCompany(rollbackData.companyCode)
      if (rollbackData.clientCode) await this.rollbackClient(rollbackData.clientCode)
      if (rollbackData.profileCode) await this.rollbackProfile(rollbackData.profileCode)
    } catch (err) {
      throw err
    }
  }

  private async rollbackClientRelation(relationId: number): Promise<void> {
    try {
      const ps = new ClientService()
      await ps.deleteClientRelation(relationId)
    } catch (err) {
      throw err
    }
  }

  private async rollbackClient(clientCode: string): Promise<void> {
    try {
      const ps = new ClientService()
      await ps.deleteClient(clientCode)
    } catch (err) {
      throw err
    }
  }

  private async rollbackCompany(companyCode: string): Promise<void> {
    try {
      const ps = new CompanyService()
      await ps.deleteCompany(companyCode)
    } catch (err) {
      throw err
    }
  }

  private async rollbackUser(userCode: string): Promise<void> {
    try {
      const ps = new UserService()
      await ps.deleteUser(userCode)
    } catch (err) {
      throw err
    }
  }

  private async rollbackProfile(profileCode: string): Promise<void> {
    try {
      const ps = new ProfileService()
      await ps.deleteProfile(profileCode)
    } catch (err) {
      throw err
    }
  }

  private async createRelationClientAdmin({ userCode, clientCode }): Promise<number> {
    try {
      const cs = new ClientService()
      const relationId = await cs.createRelationAdminClient({ userCode, clientCode })
      return relationId
    } catch (err) {
      throw err
    }
  }

  private async createProfile({ firstName, lastName }): Promise<string> {
    try {
      const ps = new ProfileService()
      const profileCode = await ps.createProfile({ firstName, lastName })
      return profileCode
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
  private async createUserAccount({ companyCode, email, username, password }): Promise<string> {
    try {
      const us = new UserService()
      const userCode = await us.createNewData({ companyCode, email, username, password })
      return userCode
    } catch (err) {
      throw err
    }
  }
  private async createClient(): Promise<string> {
    try {
      const cs = new ClientService()
      const clientCode = await cs.createNewClient()
      return clientCode
    } catch (err) {
      throw err
    }
  }
  private async createCompany(companyName: string): Promise<string> {
    try {
      const cs = new CompanyService()
      const companyCode = await cs.createNewCompany(companyName)
      return companyCode
    } catch (err) {
      throw err
    }
  }
}
