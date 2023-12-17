import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Departements extends BaseModel {
  public static table = 'departements'

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
    columnName: 'managerId', // relation to employees._id
    serializeAs: 'managerId',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public managerId: number

  @column({
    columnName: 'name',
    serializeAs: 'name',
  })
  public name: string

  @column({
    columnName: 'description',
    serializeAs: 'description',
  })
  public description: string

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
