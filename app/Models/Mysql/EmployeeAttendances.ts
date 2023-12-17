import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EmployeeAttendances extends BaseModel {
  public static table = 'employeeAttendances'

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
    columnName: 'employeeId',
    serializeAs: 'employeeId',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public employeeId: number

  @column({
    columnName: 'date',
    serializeAs: 'date',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public date: DateTime

  @column({
    columnName: 'clockInAt',
    serializeAs: 'clockInAt',
  })
  public clockInAt: string

  @column({
    columnName: 'clockOutAt',
    serializeAs: 'clockOutAt',
  })
  public clockOutAt: string

  @column({
    columnName: 'description',
    serializeAs: 'description',
  })
  public description: string

  @column({
    columnName: 'emmployeeNotes',
    serializeAs: 'emmployeeNotes',
  })
  public emmployeeNotes: string

  @column({
    columnName: 'isApproved',
    serializeAs: 'isApproved',
  })
  public isApproved: boolean

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
