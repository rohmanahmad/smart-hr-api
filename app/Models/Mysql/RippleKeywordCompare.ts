import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RippleKeyword extends BaseModel {
  public static table = 'ripple_client_keyword_compare'

  @column({ isPrimary: true, serializeAs: 'id' })
  public compareId: number

  @column()
  public compareClientId: number

  @column()
  public compareKeyId: number

  @column()
  public compareStatus: number

  @column.dateTime()
  public compareDate: DateTime

  @column()
  public compareCompKeyId: number

  @column()
  public compareColor: string
}
