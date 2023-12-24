import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ClientAdmins extends BaseModel {
  public static table = 'client_admins'

  @column({
    columnName: 'id',
    serializeAs: 'id',
    isPrimary: true,
  })
  public id: number

  @column({
    columnName: 'clientCode',
    serializeAs: 'clientCode',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public clientCode: string

  @column({
    columnName: 'userCode',
    serializeAs: 'userCode',
  })
  public userCode: string

  @column({
    columnName: 'companyCode',
    serializeAs: 'companyCode',
  })
  public companyCode: string

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
