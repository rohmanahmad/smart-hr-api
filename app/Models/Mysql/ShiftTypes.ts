import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ShiftTypes extends BaseModel {
  public static table = 'shiftTypes'

  @column({
    columnName: '_id',
    serializeAs: '_id',
    isPrimary: true,
  })
  public _id: number

  @column({
    columnName: 'companyId',
    serializeAs: 'companyId',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public companyId: number

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
    columnName: 'clockIn',
    serializeAs: 'clockIn',
  })
  public clockIn: string // time Format: HH:mm

  @column({
    columnName: 'clockOut',
    serializeAs: 'clockOut',
  })
  public clockOut: string // time Format: HH:mm

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
