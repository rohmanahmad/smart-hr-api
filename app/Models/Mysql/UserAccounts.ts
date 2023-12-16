import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RippleUser extends BaseModel {
  public static table = 'userAccounts'

  @column({ isPrimary: true, serializeAs: '_id' })
  public _id: number

  @column({
    serializeAs: 'companyId',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public companyId: string

  @column({
    serializeAs: 'username',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public username: string

  @column({
    serializeAs: 'email',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public email: string

  @column({ serializeAs: 'password' })
  public password: string

  @column({
    serializeAs: 'permisionType',
    serialize: (val: string) => {
      return val || 'basic-user'
    },
  })
  public permisionType: string

  @column({
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
    serializeAs: 'trashStatus',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public trashStatus: string

  @column({
    serializeAs: 'codeVerification',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public codeVerification: string

  @column({
    serializeAs: 'createdAt',
    serialize: (val: DateTime) => {
      return val || ''
    },
  })
  public createdAt: DateTime

  @column({
    serializeAs: 'updatedAt',
    serialize: (val: DateTime) => {
      return val || ''
    },
  })
  public updatedAt: DateTime
}
