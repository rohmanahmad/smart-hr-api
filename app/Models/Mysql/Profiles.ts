import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Profiles extends BaseModel {
  public static table = 'profiles'

  @column({ isPrimary: true, serializeAs: '_id' })
  public _id: number

  @column({
    serializeAs: 'firstName',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public firstName: string

  @column({ serializeAs: 'lastName' })
  public lastName: string

  @column({
    serializeAs: 'pictureUrl',
    serialize: (val: string) => {
      return val || 'https://profile.com/c/no-user.png'
    },
  })
  public pictureUrl: string

  @column({
    serializeAs: 'address',
    serialize: (val: string) => {
      return val || '-'
    },
  })
  public address: string

  @column({
    serializeAs: 'locationId',
    serialize: (val: number) => {
      return val || ''
    },
  })
  public locationId: number

  @column({
    serializeAs: 'birthDate',
    serialize: (val: string) => {
      return val || '1990-01-01'
    },
  })
  public birthDate: string

  @column({
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
