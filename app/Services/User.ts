import UserAccountModel from 'App/Models/Mysql/UserAccounts'
import Hash from '@ioc:Adonis/Core/Hash'
import { randomString } from 'App/Helpers/Utilities'
import { UserAccountsInterface, CodeVerificationsInterface } from 'App/Interfaces/MysqlModels'
import Logger from '@ioc:Adonis/Core/Logger'
import { DateTimeNowISO } from 'App/Helpers/Date'
import CodeVerifications from 'App/Models/Mysql/CodeVerifications'

type UserCode = string
interface NewData
  extends Omit<
    UserAccountsInterface,
    | 'code'
    | 'companyCode'
    | 'username'
    | 'email'
    | 'password'
    | 'permissionType'
    | 'status'
    | 'trashStatus'
    | 'createdAt'
    | 'updatedAt'
  > {
  code?: UserAccountsInterface['code']
  companyCode?: UserAccountsInterface['companyCode']
  username?: UserAccountsInterface['username']
  email?: UserAccountsInterface['email']
  password?: UserAccountsInterface['password']
  permissionType?: UserAccountsInterface['permissionType']
  status?: UserAccountsInterface['status']
  trashStatus?: UserAccountsInterface['trashStatus']
  createdAt?: UserAccountsInterface['createdAt']
  updatedAt?: UserAccountsInterface['updatedAt']
}

export default class UserService {
  private async checkIfExists(code: string): Promise<boolean> {
    Logger.info('Checking Existing User Before Create New User Account')
    const data = await UserAccountModel.findBy('code', code)
    if (data) return true // code already exists
    return false
  }

  private async getRandomCode(): Promise<string> {
    Logger.info('Generating Code For New User Account')
    let code = randomString(3, { alphabetPre: true })
    // check if exists by code
    let isExists = true
    do {
      isExists = await this.checkIfExists(code)
      if (isExists) code = randomString(3, { alphabetPre: true })
    } while (isExists)
    return code
  }

  private generateRandomPassword(): string {
    const p1 = randomString(3, { alphabetLo: true })
    const p2 = randomString(3, { alphabetUp: true })
    const p3 = randomString(2, { number: true })
    const p4 = randomString(2)
    const randomPassword = [p1, p2, p3, p4].join('')
    return randomPassword
  }

  private async hashPassword(password: string): Promise<string> {
    try {
      Logger.info('Hashing Password')
      const hashPass = await Hash.make(password)
      return hashPass
    } catch (err) {
      throw err
    }
  }
  public async createNewData({ companyCode, email, username, password }): Promise<UserCode> {
    try {
      Logger.info('Creating New User Account')
      const data: UserAccountsInterface = {
        code: await this.getRandomCode(), // tipe: string -> membuat random code
        companyCode,
        email,
        username,
        password,
        createdAt: DateTimeNowISO(),
        status: 'pending-confirmation',
        permissionType: 'basic-user',
        trashStatus: false,
      } // memasukkan kedalam data semua value diparameter
      data.password = await this.hashPassword(password) // tipe: promise<string> -> menjadikan hash password
      const res = await UserAccountModel.create(data) // membuat data user dan dimasukkan kedalam variabel res
      const userCode: string = res.toJSON().code // mengambil usercode dari object data.code
      return userCode // mengembalikan user code
    } catch (err) {
      throw err
    }
  }

  public validatePassword(password: string): boolean {
    try {
      Logger.info('Validate Password')
      if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
        throw new Error(' password must contain letters and numbers.')
      }

      if (password.length < 8) {
        throw new Error('password must be at least 8 characters length')
      }

      if (!/[A-Z]/.test(password)) {
        throw new Error('password must be at least contain uppercase')
      }

      return true
    } catch (err) {
      throw err
    }
  }

  public async validateUsernameIfExists(username: string): Promise<boolean> {
    try {
      Logger.info('Validating Username If Exists: %s', username)
      const data = await UserAccountModel.findBy('username', username)
      if (data) throw new Error('Username Already Exists!')
      return false
    } catch (err) {
      throw err
    }
  }

  public async validateEmailIfExists(email: string): Promise<boolean> {
    try {
      Logger.info('Validating Email If Exists: %s', email)
      const data = await UserAccountModel.findBy('email', email)
      if (data) throw new Error('email Already Exists!')
      return false
    } catch (err) {
      throw err
    }
  }

  public async deleteUser(userCode: string) {
    try {
      Logger.info('Deleting User Account: %o', { userCode })
      const data = await UserAccountModel.findByOrFail('code', userCode)
      await data.delete()
    } catch (err) {
      throw err
    }
  }

  public async getUserActiveUserByUsername(username: string) {
    try {
      Logger.info('Getting Active User Account By Username: %o', { username })
      const criteria = {
        username,
        status: 'active',
        trashStatus: false,
      }
      const q = await UserAccountModel.find(criteria)
      const data = q?.toJSON()
      return data
    } catch (err) {
      throw err
    }
  }

  public async getUserByUsername(username: string): Promise<UserAccountModel> {
    try {
      Logger.info('Getting User Account by Username: %o', { username })
      const q = await UserAccountModel.findByOrFail('username', username)
      return q
    } catch (err) {
      throw err
    }
  }

  public async getUserByEmail(email: string): Promise<UserAccountsInterface> {
    try {
      const q = await UserAccountModel.findBy('email', email)
      if (!q) throw new Error('Email Not Found')
      const item = q.toJSON() as UserAccountsInterface
      return item
    } catch (err) {
      throw err
    }
  }

  public validateStatus(status: string) {
    switch (status) {
      case 'pending-confirmation':
        throw new Error('Account Need To Be Confirmation')
      case 'blocked':
        throw new Error('Account Was Blocked')
      case 'suspend':
        throw new Error('Account Suspended')
    }
  }

  public async createNewAccount(
    data: NewData
  ): Promise<{ userCode: UserAccountsInterface['code']; newPassword: string }> {
    if (!data.code) data.code = await this.getRandomCode()
    if (!data.email) throw new Error('Invalid Email')
    if (!data.username) throw new Error('Invalid Username')
    if (!data.companyCode) throw new Error('Invalid Company Code')
    let plainPassword: string = ''
    if (!data.password) {
      plainPassword = this.generateRandomPassword()
      data.password = await this.hashPassword(plainPassword)
    }
    if (!data.status) data.status = 'active'
    if (!data.trashStatus) data.trashStatus = false
    if (!data.permissionType) data.permissionType = 'employee'
    const res = await UserAccountModel.create(data)
    const userCode: string = res.toJSON().code
    return { userCode, newPassword: plainPassword }
  }
}
