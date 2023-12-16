import UserModel from 'App/Models/Mysql/RippleUser'

declare module 'App/Services/User' {
  interface UserInfo {
    userId: string
    userEmail: string
    userClient: number
    password: string
    userName: string
    userPhoto: string
    userKeyword: string
  }
}
export default class UserService {
  public async getInfoFromActiveUser(username: string): Promise<UserModel> {
    try {
      const data = await UserModel.query()
        .select([
          'user_id',
          'user_email',
          'user_client',
          'user_password',
          'user_name',
          'user_photo',
          'user_keyword',
          'token_expired',
        ])
        .where({ user_name: username, is_trash: 0, user_status: 1 })
        .first()
      const serializedData = data?.serialize() as UserModel
      return serializedData
    } catch (err) {
      throw err
    }
  }

  public async updateLastLoginByUsername(username: string): Promise<void> {
    try {
      await UserModel.query().where({ user_name: username }).update({
        user_logindate: new Date(),
      })
    } catch (err) {
      throw err
    }
  }
}
