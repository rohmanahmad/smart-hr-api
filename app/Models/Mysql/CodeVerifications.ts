import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CodeVerificationsModel extends BaseModel {
  public static table = 'code_verifications'

  @column({
    isPrimary: true,
    serializeAs: 'code',
  })
  public code: string

  @column({
    columnName: 'userCode',
    serializeAs: 'userCode',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public userCode: string

  @column({
    columnName: 'codeType',
    serializeAs: 'codeType',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public codeType: string

  @column({
    columnName: 'ttl',
    serializeAs: 'ttl',
    serialize: (val: string) => {
      return DateTime.fromISO(val)
    },
  })
  public ttl: string | null

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
