import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Companies extends BaseModel {
  public static table = 'companies'

  @column({
    columnName: '_id',
    serializeAs: '_id',
    isPrimary: true,
  })
  public _id: number

  @column({
    columnName: 'name',
    serializeAs: 'name',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public name: string

  @column({
    columnName: 'description',
    serializeAs: 'description',
  })
  public description: string

  @column({
    columnName: 'address',
    serializeAs: 'address',
  })
  public address: string

  @column({
    columnName: 'cityId',
    serializeAs: 'cityId',
  })
  public cityId: string

  @column({
    columnName: 'provinceId',
    serializeAs: 'provinceId',
  })
  public provinceId: string

  @column({
    columnName: 'postalCode',
    serializeAs: 'postalCode',
  })
  public postalCode: string

  @column({
    columnName: 'phoneNumber1',
    serializeAs: 'phoneNumber1',
  })
  public phoneNumber1: string

  @column({
    columnName: 'phoneNumber2',
    serializeAs: 'phoneNumber2',
  })
  public phoneNumber2: string

  @column({
    columnName: 'email',
    serializeAs: 'email',
  })
  public email: string

  @column({
    columnName: 'website',
    serializeAs: 'website',
  })
  public website: string

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
