import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Employees extends BaseModel {
  public static table = 'employees'

  @column({
    columnName: 'code',
    serializeAs: 'code',
    isPrimary: true,
    serialize: (val: string) => {
      return val || ''
    },
  })
  public code: string

  @column({
    columnName: 'companyCode',
    serializeAs: 'companyCode',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public companyCode: string

  @column({
    columnName: 'userCode',
    serializeAs: 'userCode',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public userCode: string

  @column({
    columnName: 'departementCode',
    serializeAs: 'departementCode',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public departementCode: string

  @column({
    columnName: 'profileCode',
    serializeAs: 'profileCode',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public profileCode: string

  @column({
    columnName: 'employmentStatus',
    serializeAs: 'employmentStatus',
    serialize: (val: number) => {
      return val || 'contract'
    },
  })
  public employmentStatus: string

  @column({
    columnName: 'salary',
    serializeAs: 'salary',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public salary: string

  @column({
    columnName: 'jobPosition',
    serializeAs: 'jobPosition',
    serialize: (val: string) => {
      /* 
      available status:
        - manager
        - programmer
        - ceo
        - others
      */
      return val || '-'
    },
  })
  public jobPosition: string

  @column({
    columnName: 'hireDate',
    serializeAs: 'hireDate',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public hireDate: string

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
