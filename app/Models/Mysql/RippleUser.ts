import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RippleUser extends BaseModel {
  public static table = 'ripple_user'

  // @hasOne(() => PackageRestriction, {
  //   localKey: 'packageRestrictionUserClient',
  // })
  // public packageRestriction: HasOne<typeof PackageRestriction>

  @column({ isPrimary: true, serializeAs: 'userId' })
  public userId: number

  @column({
    serializeAs: 'userPhone',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public userPhone: string

  @column({
    serializeAs: 'userCompany',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public userCompany: string

  @column({
    serializeAs: 'userAddress',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public userAddress: string

  @column({
    serializeAs: 'userName',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public userName: string

  @column({
    serializeAs: 'userFullname',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public userFullname: string

  @column({
    serializeAs: 'userEmail',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public userEmail: string

  @column({ serializeAs: 'userPassword' })
  public userPassword: string

  @column({
    serializeAs: 'userPhoto',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public userPhoto: string

  @column({
    serializeAs: 'userGroup',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public userGroup: number

  @column({
    serializeAs: 'userClient',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public userClient: number

  @column({
    serializeAs: 'userStatus',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public userStatus: number

  @column({
    serializeAs: 'userVerification',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public userVerification: string

  @column({
    serializeAs: 'userAdd',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public userAdd: string

  @column({
    serializeAs: 'userUpdate',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public userUpdate: string

  @column.dateTime({ serializeAs: 'userLogindate' })
  public userLogindate: DateTime

  @column({
    serializeAs: 'appId',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public appId: number

  @column({
    serializeAs: 'isTrash',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public isTrash: number

  @column({
    serializeAs: 'userKeyword',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public userKeyword: string

  @column({
    serializeAs: 'tokenExpired',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public tokenExpired: number

  @column.dateTime({ autoCreate: true, serializeAs: 'timeAdd' })
  public timeAdd: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'timeUpdate' })
  public timeUpdate: DateTime
}
