import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TaskEmailSenderModel extends BaseModel {
  public static table = 'task_email_sender'

  @column({
    columnName: 'id',
    serializeAs: 'id',
    isPrimary: true,
  })
  public id: number

  @column({
    columnName: 'uuid',
    serializeAs: 'uuid',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public uuid: string

  @column({
    columnName: 'isHTML',
    serializeAs: 'isHTML',
    serialize: (val: boolean) => {
      return val // if true: engine will read configData as a json. else: as configData as a text
    },
  })
  public isHTML: boolean

  @column({
    columnName: 'sentAsEmail',
    serializeAs: 'sentAsEmail',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public sentAsEmail: string

  @column({
    columnName: 'sentAsName',
    serializeAs: 'sentAsName',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public sentAsName: string

  @column({
    columnName: 'email',
    serializeAs: 'email',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public email: string

  @column({
    columnName: 'cc',
    serializeAs: 'cc',
  })
  public cc: string

  @column({
    columnName: 'bcc',
    serializeAs: 'bcc',
  })
  public bcc: string

  @column({
    columnName: 'subject',
    serializeAs: 'subject',
  })
  public subject: string

  @column({
    columnName: 'templateName',
    serializeAs: 'templateName',
  })
  public templateName: string

  @column({
    columnName: 'contentData',
    serializeAs: 'contentData',
    serialize: (stringValue: string = '{}') => {
      try {
        return JSON.parse(stringValue)
      } catch (err) {
        return {}
      }
    },
  })
  public contentData: string

  @column({
    columnName: 'status',
    serializeAs: 'status',
  })
  public status: string // pending,sent,cancel,

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
