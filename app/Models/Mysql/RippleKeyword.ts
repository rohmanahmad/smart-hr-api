import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RippleKeyword extends BaseModel {
  public static table = 'ripple_client_keyword'

  @column({ isPrimary: true, serializeAs: 'keyId' })
  public keyId: number

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public keyAlertSms: string

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column.dateTime({ serializeAs: null })
  public lastCrawlAt: DateTime

  /**
   * @deprecated This Field Should Not Be Used (Not User Anymore)
   */
  @column({ serializeAs: null })
  public onCrawling: number

  /**
   * @deprecated This Field Should Not Be Used (Not User Anymore)
   */
  @column({ serializeAs: null })
  public statusCrawlFacebook: number

  /**
   * @deprecated This Field Should Not Be Used (Not User Anymore)
   */
  @column({ serializeAs: null })
  public statusCrawlLinkedin: number

  @column({
    serializeAs: 'industryId',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public industryId: number

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public keyStatusRecrawl: number

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column.dateTime({ serializeAs: null })
  public lastAlertSent: DateTime

  @column({
    serializeAs: 'keywordLogo',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public keywordLogo: string

  @column({
    serializeAs: 'keyEmailPic',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public keyEmailPic: string

  @column.dateTime()
  public keyStartDate: DateTime

  @column.dateTime()
  public keyEndDate: DateTime

  @column({
    serializeAs: 'keyLang',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public keyLang: string

  @column({
    serializeAs: 'keyClientId',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public keyClientId: number

  @column({
    serializeAs: 'keyWord',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public keyWord: string

  @column({
    serializeAs: 'keyIsCc',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public keyIsCc: number

  @column({
    serializeAs: 'keyWordIn',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public keyWordIn: string

  @column({
    serializeAs: 'keyWordNot',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public keyWordNot: string

  @column({
    serializeAs: 'keyDesc',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public keyDesc: string

  @column({
    serializeAs: 'keyStatus',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public keyStatus: number

  @column.dateTime({
    autoCreate: true,
    serializeAs: 'timeAdd',
    serialize: (x) => new Date(x) || new Date('1991-01-01 00:00:00'),
  })
  public timeAdd: DateTime

  @column({
    serializeAs: 'userAdd',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public userAdd: number

  @column.dateTime({ autoUpdate: true })
  public timeUpdate: DateTime

  @column({
    serializeAs: 'userUpdate',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public userUpdate: number

  @column({
    serializeAs: 'isTrash',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public isTrash: number

  @column({
    serializeAs: 'keyCampaignId',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public keyCampaignId: number

  @column({
    serializeAs: 'keyBrandId',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public keyBrandId: number

  @column({
    serializeAs: 'keyStreamStatus',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public keyStreamStatus: number

  @column({
    serializeAs: 'keyPositif',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public keyPositif: string

  @column({
    serializeAs: 'keyNegatif',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public keyNegatif: string

  @column({
    serializeAs: 'keyTag',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public keyTag: string

  @column({
    serializeAs: 'keyName',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public keyName: string

  @column({
    serializeAs: 'keyColor',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public keyColor: string

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public keyWordCcId: string

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public keyCompetitorCcId: string

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public alertActive: number

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public emailAlert: string

  @column({
    serializeAs: 'phone',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public phone: string

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public increase: number

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public enableSlideCc: number

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public slideScreenCc: string

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public durationCc: number

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public enableEmailIg: number

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public enableEmailIgCompetition: number

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public emailIg: string

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public ccIg: string

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public bccIg: string

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public hourIg: string

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public emailIgCompetition: string

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public ccIgCompetition: string

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public bccIgCompetition: string

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public hourIgCompetition: string

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column.dateTime({ serializeAs: null })
  public lastIgSent: DateTime

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column.dateTime({ serializeAs: null })
  public lastIgSentCompetition: DateTime

  @column({
    serializeAs: 'buzzerTwitter',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public buzzerTwitter: string

  @column({
    serializeAs: 'buzzerFb',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public buzzerFb: string

  @column({
    serializeAs: 'buzzerIg',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public buzzerIg: string

  /**
   * @deprecated This Field Should Not Be Used (Not User Anymore)
   */
  @column({ serializeAs: null })
  public keywordTracking: string

  /**
   * @deprecated This Field Should Not Be Used (Not User Anymore)
   */
  @column({ serializeAs: null })
  public keyType: string

  /**
   * @deprecated This Field Should Not Be Used (Not User Anymore)
   */
  @column({ serializeAs: null })
  public keyItemKeyword: string

  /**
   * @deprecated This Field Should Not Be Used (Not User Anymore)
   */
  @column({ serializeAs: null })
  public includeBot: number

  @column({
    serializeAs: 'accFbBot',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public accFbBot: string

  @column({
    serializeAs: 'accTwitterBot',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public accTwitterBot: string

  @column({
    serializeAs: 'accIgBot',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public accIgBot: string

  @column({
    serializeAs: 'keySociomileId',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public keySociomileId: number

  @column({
    serializeAs: 'keySociomileToken',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public keySociomileToken: string

  @column({
    serializeAs: 'temporaryToken',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public temporaryToken: string

  @column({
    serializeAs: 'keyIsBuzzerTracking',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public keyIsBuzzerTracking: number

  @column({
    serializeAs: 'keyIsHealthIndex',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public keyIsHealthIndex: number

  @column({
    serializeAs: 'keyIsPrdashboard',
    serialize: (val: number) => {
      return val || 0
    },
  })
  public keyIsPrdashboard: number

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public alertSmsActive: number

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column.dateTime({ serializeAs: null })
  public lastAlertSmsSent: DateTime

  /**
   * @deprecated This Field Should Not Be Used (Move To Mongodb)
   */
  @column({ serializeAs: null })
  public keySentimentLipi: number

  /**
   * @deprecated This Field Should Not Be Used (Not User Anymore)
   */
  @column({ serializeAs: null })
  public keyUsers: string

  /**
   * @deprecated This Field Should Not Be Used (Not User Anymore)
   */
  @column.dateTime({ serializeAs: null })
  public lastRowCrawl: DateTime

  @column({
    serializeAs: 'tiktokKeyword',
    serialize: (val: string) => {
      return val || ''
    },
  })
  public tiktokKeyword: string
}
