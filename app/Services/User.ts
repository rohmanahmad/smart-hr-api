import UserAccountModel from 'App/Models/Mysql/UserAccounts'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UserService {
  public async createNewData({
    email,
    firstName,
    lastName,
    username,
    password,
    companyId,
  }): Promise<boolean> {
    try {
      const data = {
        email,
        firstName,
        lastName,
        companyId,
        username,
        password,
        codeVerification: this.getCodeVerification(),
      }
      data.password = await this.hashPassword(password)
      await UserAccountModel.create(data)
      return true
    } catch (err) {
      throw err
    }
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

  private getCodeVerification(min: number = 1000, max: number = 9999): string {
    return Math.floor(Math.random() * (max - min + 1) + min).toString()
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
