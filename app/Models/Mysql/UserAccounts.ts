import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserAccounts extends BaseModel {
  public static table = 'user_accounts'

  // @column({ isPrimary: true, serializeAs: '_id' })
  public _id: number

  @column({
    columnName: 'companyId',
    serializeAs: 'companyId',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public companyId: string

  @column({
    columnName: 'username',
    serializeAs: 'username',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public username: string

  @column({
    columnName: 'email',
    serializeAs: 'email',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public email: string

  @column({
    columnName: 'password',
    serializeAs: 'password',
  })
  public password: string

  @column({
    columnName: 'permisionType',
    serializeAs: 'permisionType',
    serialize: (val: string) => {
      return val || 'basic-user'
    },
  })
  public permisionType: string

  @column({
    columnName: 'status',
    serializeAs: 'status',
    serialize: (val: string) => {
      /* 
      available status:
        - active
        - inactive
        - pending-confirmation
        - suspend
      */
      return val || 'pending-confirmation'
    },
  })
  public status: string

  @column({
    columnName: 'trashStatus',
    serializeAs: 'trashStatus',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public trashStatus: string

  @column({
    columnName: 'codeVerification',
    serializeAs: 'codeVerification',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public codeVerification: string

  @column({
    columnName: 'createdAt',
    serializeAs: 'createdAt',
    serialize: (val: DateTime) => {
      return val || ''
    },
  })
  public createdAt: DateTime

  @column({
    columnName: 'updatedAt',
    serializeAs: 'updatedAt',
    serialize: (val: DateTime) => {
      return val || ''
    },
  })
  public updatedAt: DateTime
}
