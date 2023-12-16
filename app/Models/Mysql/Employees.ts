import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RippleUser extends BaseModel {
  public static table = 'employees'

  @column({ isPrimary: true, serializeAs: '_id' })
  public _id: number

  @column({
    serializeAs: 'companyId',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public companyId: number

  @column({
    serializeAs: 'userId',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public userId: number

  @column({
    serializeAs: 'departementId',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public departementId: number

  @column({
    serializeAs: 'profileId',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public profileId: number

  @column({
    serializeAs: 'employmentStatus',
    serialize: (val: number) => {
      return val || 'contract'
    },
  })
  public employmentStatus: string

  @column({
    serializeAs: 'salary',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public salary: string

  @column({
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
    serializeAs: 'hireDate',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public hireDate: string

  @column({
    serializeAs: 'createdAt',
    serialize: (val: DateTime) => {
      return val || ''
    },
  })
  public createdAt: DateTime

  @column({
    serializeAs: 'updatedAt',
    serialize: (val: DateTime) => {
      return val || ''
    },
  })
  public updatedAt: DateTime
}
