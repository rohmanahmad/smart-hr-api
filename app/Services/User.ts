import UserAccountModel from 'App/Models/Mysql/UserAccounts'

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
      await UserAccountModel.create(data)
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

  private async validateEmailIfExists(username: string): Promise<boolean> {
    try {
      //
      return false
    } catch (err) {
      throw err
    }
  }

  private getCodeVerification(min: number = 1, max: number = 9999): string {
    return Math.floor(Math.random() * (max - min + 1) + min).toString()
  }
}
