import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SubscriptionFeatures extends BaseModel {
  public static table = 'subscriptionFeatures'

  @column({
    columnName: '_id',
    serializeAs: '_id',
    isPrimary: true,
  })
  public _id: number

  @column({
    columnName: 'subscriptionCode',
    serializeAs: 'subscriptionCode',
  })
  public subscriptionCode: string

  @column({
    columnName: 'feature',
    serializeAs: 'feature',
  })
  public feature: string

  @column({
    columnName: 'status',
    serializeAs: 'status',
    serialize: (value: string) => {
      return value || 'active'
    },
  })
  public status: string

  @column({
    columnName: 'sortIndex',
    serializeAs: 'sortIndex',
    serialize: (value: number) => {
      return value || 0
    },
  })
  public sortIndex: number

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
