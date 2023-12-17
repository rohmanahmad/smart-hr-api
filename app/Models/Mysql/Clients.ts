import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Clients extends BaseModel {
  public static table = 'clients'

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
    columnName: 'subscriptionId',
    serializeAs: 'subscriptionId',
  })
  public subscriptionId: string

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
