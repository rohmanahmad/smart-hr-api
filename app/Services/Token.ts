import { UserTokensInterface } from 'App/Interfaces/MysqlModels'
import { OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth'
import UserAccounts from 'App/Models/Mysql/UserAccounts'
import { DateTimeNowISO } from 'App/Helpers/Date'
import UserTokens from 'App/Models/Mysql/UserTokens'

export default class TokenService {
  public async createToken(userData: UserAccounts, jwt: OpaqueTokenContract<UserAccounts>) {
    const itemToInsert: UserTokensInterface = {
      id: null,
      token: jwt.token,
      userCode: userData.code,
      ttl: jwt.expiresAt,
      createdAt: DateTimeNowISO(),
      updatedAt: null,
    }
    await UserTokens.create(itemToInsert)
  }
}
