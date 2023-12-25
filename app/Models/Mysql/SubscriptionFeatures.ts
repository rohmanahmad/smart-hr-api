import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SubscriptionFeaturesModel extends BaseModel {
  public static table = 'subscription_features'

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
