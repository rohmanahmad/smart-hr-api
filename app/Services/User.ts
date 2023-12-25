import UserAccountModel from 'App/Models/Mysql/UserAccounts'
import Hash from '@ioc:Adonis/Core/Hash'
import { randomString } from 'App/Helpers/Utilities'
import { UserAccountsInterface } from 'App/Interfaces/MysqlModels'
import Logger from '@ioc:Adonis/Core/Logger'
import { DateTimeNowISO } from 'App/Helpers/Date'

type UserCode = string

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

  public async getUserByUsername(username: string): Promise<UserAccountsInterface> {
    try {
      Logger.info('Getting User Account by Username: %o', { username })
      const q = await UserAccountModel.findBy('username', username)
      const data = q?.toJSON() as unknown as UserAccountModel
      return data
    } catch (err) {
      throw err
    }
  }

  public async createNewAccount(data): Promise<UserAccountsInterface['code']> {
    const res = await UserAccountModel.create(data)
    const userCode: string = res.toJSON().code
    return userCode
  }
}
