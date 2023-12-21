import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Companies extends BaseModel {
  public static table = 'companies'

  @column({
    columnName: 'code',
    serializeAs: 'code',
    isPrimary: true,
  })
  public code: string

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
    columnName: 'locationCode',
    serializeAs: 'locationCode',
  })
  public locationCode: string

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
