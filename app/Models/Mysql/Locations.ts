import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class LocationsModel extends BaseModel {
  public static table = 'locations'

  @column({
    columnName: 'code',
    serializeAs: 'code',
    isPrimary: true,
  })
  public code: string

  @column({
    columnName: 'postalCode',
    serializeAs: 'postalCode',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public postalCode: string

  @column({
    columnName: 'name',
    serializeAs: 'name',
  })
  public name: string

  @column({
    columnName: 'negaraCode',
    serializeAs: 'negaraCode',
  })
  public negaraCode: string

  @column({
    columnName: 'provinsiCode',
    serializeAs: 'provinsiCode',
  })
  public provinsiCode: string

  @column({
    columnName: 'kabkotaCode',
    serializeAs: 'kabkotaCode',
  })
  public kabkotaCode: string

  @column({
    columnName: 'kecamatanCode',
    serializeAs: 'kecamatanCode',
  })
  public kecamatanCode: string

  @column({
    columnName: 'desaCode',
    serializeAs: 'desaCode',
  })
  public desaCode: string

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
