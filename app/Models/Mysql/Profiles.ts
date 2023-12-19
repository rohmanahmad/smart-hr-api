import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Profiles extends BaseModel {
  public static table = 'profiles'

  @column({
    isPrimary: true,
    columnName: '_id',
    serializeAs: '_id',
  })
  public _id: number

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
    columnName: 'locationId',
    serializeAs: 'locationId',
    serialize: (val: number) => {
      return val || ''
    },
  })
  public locationId: number

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
