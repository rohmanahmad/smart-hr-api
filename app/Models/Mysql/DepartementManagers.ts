import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DepartementManagers extends BaseModel {
  public static table = 'departement_managers'

  @column({
    columnName: 'code',
    serializeAs: 'code',
    isPrimary: true,
  })
  public code: string

  @column({
    columnName: 'companyCode',
    serializeAs: 'companyCode',
  })
  public companyCode: string

  @column({
    columnName: 'departementCode',
    serializeAs: 'departementCode',
  })
  public departementCode: string

  @column({
    columnName: 'employeeCode',
    serializeAs: 'employeeCode',
  })
  public employeeCode: string

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
