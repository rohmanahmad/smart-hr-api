import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProfilesModel extends BaseModel {
  public static table = 'profiles'

  @column({
    isPrimary: true,
    columnName: 'code',
    serializeAs: 'code',
  })
  public code: string

  @column({
    columnName: 'firstName',
    serializeAs: 'firstName',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public firstName: string

  @column({
    columnName: 'lastName',
    serializeAs: 'lastName',
  })
  public lastName: string

  @column({
    columnName: 'pictureUrl',
    serializeAs: 'pictureUrl',
    serialize: (val: string) => {
      return val || 'https://profile.com/c/no-user.png'
    },
  })
  public pictureUrl: string

  @column({
    columnName: 'address',
    serializeAs: 'address',
    serialize: (val: string) => {
      return val || '-'
    },
  })
  public address: string

  @column({
    columnName: 'locationCode',
    serializeAs: 'locationCode',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public locationCode: string

  @column({
    columnName: 'birthDate',
    serializeAs: 'birthDate',
    serialize: (val: string) => {
      return val || '1990-01-01'
    },
  })
  public birthDate: string

  @column({
    columnName: 'gender',
    serializeAs: 'gender',
    serialize: (val: string) => {
      /* 
      available genders:
      - male
      - female
      */
      return val || ''
    },
  })
  public gender: string

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
