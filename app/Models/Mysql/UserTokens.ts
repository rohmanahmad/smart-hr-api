import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserTokensModel extends BaseModel {
  public static table = 'user_tokens'

  @column({
    columnName: 'id',
    serializeAs: 'id',
    isPrimary: true,
  })
  public _id: number

  @column({
    columnName: 'userCode',
    serializeAs: 'userCode',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public userCode: string

  @column({
    columnName: 'token',
    serializeAs: 'token',
  })
  public token: string

  @column({
    columnName: 'ttl',
    serializeAs: 'ttl',
  })
  public ttl: DateTime

  @column({
    columnName: 'createdAt',
    serializeAs: 'createdAt',
    serialize: (val: string) => {
      return DateTime.fromISO(val)
    },
  })
  public createdAt: string | null

  @column({
    columnName: 'updatedAt',
    serializeAs: 'updatedAt',
    serialize: (val: string) => {
      return DateTime.fromISO(val)
    },
  })
  public updatedAt: string | null
}
