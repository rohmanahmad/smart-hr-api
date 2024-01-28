import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/User'
import CompanyService from 'App/Services/Company'
import ClientService from 'App/Services/Clients'
import ProfileService from 'App/Services/Profiles'
import CodeVerificationsService from 'App/Services/CodeVerifications'

type RollbackData = {
  clientCode?: string
  companyCode?: string
  profileCode?: string
  userCode?: string
  relationId?: number
}

export default class UserAccountRegistrationController {
  public async handle({ request, response }: HttpContextContract) {
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
    const rollbackData: RollbackData = {} // nilai awal: object{} tipe: RollbackData
    try {
      await this.validateUserInput({
        email,
        username,
        password,
        confirmPassword,
        companyName,
      }) // tipe: Promise<void> -> validasi input
      const clientCode = await this.createClient() // tipe Promise<string> -> mendapatkan clientcode dari tabel client
      rollbackData.clientCode = clientCode // memasukkan data dalam variabel rollbackdata dengan key "clientcode" dan value bertipedata: string
      const companyCode = await this.createCompany(companyName) // tipe Promise<string> -> mendapatkan companycode dari tabel company
      rollbackData.companyCode = companyCode // memasukkan data dalam variabel rollbackdata dengan key "companycode" dan value bertipedata: string
      const profileCode = await this.createProfile({ firstName, lastName }) // tipe Promise<string> -> mendapatkan profilcode dari tabel profil berdasarkan firstName dan lastName
      rollbackData.profileCode = profileCode // memasukkan data dalam variabel rollbackdata dengan key "profilecode" dan value bertipedata: string
      const userCode = await this.createUserAccount({ companyCode, email, username, password }) // tipe Promise<string> -> mendapatkan usercode dari tabel userAccount berdasarkan companycode email username dan password
      rollbackData.userCode = userCode // memasukkan data dalam variabel rollbackdata dengan key "usercode" dan value bertipedata: string
      const relationId = await this.createRelationClientAdmin({ userCode, clientCode, companyCode }) // tipe Promise<number> -> mendapatkan relationid dari tabel clientadmin berdasarkan usercode dan cliencode
      rollbackData.relationId = relationId // memasukkan data dalam variabel rollbackdata dengan key "relationid" dan value bertipedata: number
      await this.createCodeVerification(userCode) // tipe Promise<void> -> membuat kode verifikasi
      return true
    } catch (err) {
      await this.rollbackDataToDefault(rollbackData) // jika eror kembalikan data ke default
      throw err
    }
  }

  private async createCodeVerification(userCode: string): Promise<void> {
    try {
      const cv = new CodeVerificationsService()
      await cv.createNewRegistrationCode(userCode)
    } catch (err) {
      throw err
    }
  }

  private async rollbackDataToDefault(rollbackData: RollbackData) {
    try {
      if (rollbackData.relationId) await this.rollbackClientRelation(rollbackData.relationId) // tipe promise<void> -> jika dalam variabel rollbackdata ada relation id maka hapus relationid
      if (rollbackData.userCode) await this.rollbackUser(rollbackData.userCode) // tipe promise<void> jika dalam variabel rollbackdata ada usercode maka hapus usercode
      if (rollbackData.companyCode) await this.rollbackCompany(rollbackData.companyCode) // tipe promise<void> jika dalam variabel rollbackdata ada companycode maka hapus companycode
      if (rollbackData.clientCode) await this.rollbackClient(rollbackData.clientCode) // tipe promise<void> jika dalam variabel rollbackdata ada clientcode maka hapus clientcode
      if (rollbackData.profileCode) await this.rollbackProfile(rollbackData.profileCode) // tipe promise<void> jika dalam variabel rollbackdata ada profilcode maka hapus profilcode
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

  private async createRelationClientAdmin({ userCode, clientCode, companyCode }): Promise<number> {
    try {
      const cs = new ClientService()
      const relationId = await cs.createRelationAdminClient({ userCode, clientCode, companyCode })
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
