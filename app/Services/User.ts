import UserAccountModel from 'App/Models/Mysql/UserAccounts'
import Hash from '@ioc:Adonis/Core/Hash'
import { randomString } from 'App/Helpers/Utilities'

type UserCode = string

export default class UserService {
  public async createNewData({ companyCode, email, username, password }): Promise<UserCode> {
    try {
      const data = {
        code: this.getRandomCode(),
        companyCode,
        email,
        username,
        password,
      }
      data.password = await this.hashPassword(password)
      const res = await UserAccountModel.create(data)
      const userCode: string = res.toJSON().code
      return userCode
    } catch (err) {
      throw err
    }
  }

  private getRandomCode(): string {
    return randomString(3, { alphabetPre: true })
  }

  public validatePassword(password: string): boolean {
    try {
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
      const data = await UserAccountModel.findBy('username', username)
      if (data) throw new Error('Username Already Exists!')
      return false
    } catch (err) {
      throw err
    }
  }

  public async validateEmailIfExists(email: string): Promise<boolean> {
    try {
      //
      const data = await UserAccountModel.findBy('email', email)
      if (data) throw new Error('email Already Exists!')
      return false
    } catch (err) {
      throw err
    }
  }

  public async deleteUser(userCode: string) {
    try {
      const data = await UserAccountModel.findByOrFail('code', userCode)
      await data.delete()
    } catch (err) {
      throw err
    }
  }

  private async hashPassword(password: string): Promise<string> {
    try {
      const hashPass = await Hash.make(password)
      return hashPass
    } catch (err) {
      throw err
    }
  }
}
