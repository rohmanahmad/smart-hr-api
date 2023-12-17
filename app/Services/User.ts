import UserAccountModel from 'App/Models/Mysql/UserAccounts'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UserService {
  public async createNewData({ email, username, password }): Promise<boolean> {
    try {
      const data = {
        email,
        username,
        password,
        codeVerification: this.getCodeVerification(),
      }
      await this.validateEmailIfExists(email)
      await this.validateUsernameIfExists(username)
      this.validatePassword(password)
      data.password = await this.hashPassword(password)
      await UserAccountModel.create(data)
      return true
    } catch (err) {
      throw err
    }
  }

  private validatePassword(password: string): boolean {
    try {
      /**
       * - harus mengandung huruf dan angka
       * - panjang karakter minimal 8karakter
       */
      return true
    } catch (err) {
      throw err
    }
  }

  private async validateUsernameIfExists(username: string): Promise<boolean> {
    try {
      const data = await UserAccountModel.findBy('username', username)
      if (data) throw new Error('Username Already Exists!')
      return false
    } catch (err) {
      throw err
    }
  }

  private async validateEmailIfExists(email: string): Promise<boolean> {
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
