import Logger from '@ioc:Adonis/Core/Logger'
import UserAdminModel from 'App/Models/Mysql/UserAdmins'

export default class UserAdminService {
  public async getUserAdmin(userAdmin: string): Promise<UserAdminModel> {
    try {
      Logger.info('Getting User Account by Username: %o', { userAdmin })
      const q = await UserAdminModel.findByOrFail('username', userAdmin)
      return q
    } catch (err) {
      throw err
    }
  }
}
