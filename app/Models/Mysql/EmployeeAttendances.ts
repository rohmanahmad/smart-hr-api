import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EmployeeAttendancesModel extends BaseModel {
  public static table = 'employee_attendances'

  @column({
    columnName: 'id',
    serializeAs: 'id',
    isPrimary: true,
  })
  public _id: number

  @column({
    columnName: 'companyCode',
    serializeAs: 'companyCode',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public companyCode: string

  @column({
    columnName: 'permitCode',
    serializeAs: 'permitCode',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public permitCode: string

  @column({
    columnName: 'employeeCode',
    serializeAs: 'employeeCode',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public employeeCode: string

  @column({
    columnName: 'shiftCode',
    serializeAs: 'shiftCode',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public shiftCode: string

  @column({
    columnName: 'clockType',
    serializeAs: 'clockType',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public clockType: string

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
    columnName: 'locationCoordinate',
    serializeAs: 'locationCoordinate',
  })
  public locationCoordinate: string

  @column({
    columnName: 'status',
    serializeAs: 'status',
  })
  public status: string

  @column({
    columnName: 'note',
    serializeAs: 'note',
  })
  public note: string

  @column({
    columnName: 'isApproved',
    serializeAs: 'isApproved',
    serialize: (value: number) => {
      return value > 0
    },
  })
  public isApproved: boolean

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
