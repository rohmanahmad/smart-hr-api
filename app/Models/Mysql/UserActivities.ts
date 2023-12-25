import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserActivities extends BaseModel {
  public static table = 'user_activities'

  @column({
    columnName: '_id',
    serializeAs: '_id',
    isPrimary: true,
  })
  public _id: number

  @column({
    columnName: 'userCode',
    serializeAs: 'userCode',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public userCode: string

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
