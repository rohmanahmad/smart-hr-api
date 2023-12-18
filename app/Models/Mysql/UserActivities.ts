import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserActivities extends BaseModel {
  public static table = 'userActivities'

  @column({
    columnName: '_id',
    serializeAs: '_id',
    isPrimary: true,
  })
  public _id: number

  @column({
    columnName: 'userId',
    serializeAs: 'userId',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public userId: number

  @column({
    columnName: 'date',
    serializeAs: 'date',
  })
  public date: DateTime

  @column({
    columnName: 'type',
    serializeAs: 'type',
  })
  public type: string

  @column({
    columnName: 'detail',
    serializeAs: 'detail',
  })
  public detail: string

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
