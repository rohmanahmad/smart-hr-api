import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PackageRestriction extends BaseModel {
  public static table = 'cms_package_restriction'

  // @belongsTo(() => RippleUser, {
  //   foreignKey: 'rippleUserClientId',
  // })
  // public user: BelongsTo<typeof RippleUser>

  @column({ isPrimary: true, serializeAs: 'restrictionId' })
  public id: number

  @column({
    serializeAs: 'clientId',
  })
  public clientId: number

  @column({
    serializeAs: 'packageName',
    serialize: (val: string) => {
      return val || 'custom'
    },
  })
  public package: string

  @column({
    serializeAs: 'maxNumberStream',
    serialize: (val: number) => {
      return val || -1
    },
  })
  public maxNumberStream: number

  @column({
    serializeAs: 'maxNumberProject',
    serialize: (val: number) => {
      return val || -1
    },
  })
  public maxNumberProject: number

  @column({
    serializeAs: 'maxNumberKeyword',
    serialize: (val: number) => {
      return val || -1
    },
  })
  public maxNumberKeyword: number

  @column({
    serializeAs: 'isEditProject',
    serialize: (val: number) => {
      return val === 1
    },
  })
  public isEditProject: number

  @column({ serializeAs: 'channelCrawl' })
  public channelCrawl: string

  @column({ serializeAs: 'pageShow' })
  public pageShow: string

  @column({
    serializeAs: 'isCcActive',
    serialize: (val: number) => {
      return val === 1
    },
  })
  public isCcActive: number

  @column({ serializeAs: 'ccComponent' })
  public ccComponent: string

  @column({
    serializeAs: 'isTrash',
    serialize: (val: number) => {
      return val === 1
    },
  })
  public isTrash: number

  @column({
    serializeAs: 'dateLimit',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public dateLimit: string
}
