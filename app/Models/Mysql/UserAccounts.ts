import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserAccountsModel extends BaseModel {
  public static table = 'user_accounts'

  @column({
    isPrimary: true,
    serializeAs: 'code',
  })
  public code: string

  @column({
    columnName: 'companyCode',
    serializeAs: 'companyCode',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public companyCode: string

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
    columnName: 'permissionType',
    serializeAs: 'permissionType',
    serialize: (val: string) => {
      return val || 'basic-user'
    },
  })
  public permissionType: 'basic-user' | 'employee' | 'manager' | 'other'

  @column({
    columnName: 'status',
    serializeAs: 'status',
    serialize: (val: string) => {
      /* 
      available status:
        - active
        - blocked
        - pending-confirmation
        - suspend
      */
      return val || 'pending-confirmation'
    },
  })
  public status: 'active' | 'blocked' | 'pending-confirmation' | 'suspend'

  @column({
    columnName: 'trashStatus',
    serializeAs: 'trashStatus',
  })
  public trashStatus: boolean

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
