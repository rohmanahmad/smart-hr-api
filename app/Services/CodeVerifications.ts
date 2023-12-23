import { DateTimeNowISO, DateUTC, randomString } from 'App/Helpers/Utilities'
import CodeVerifications from 'App/Models/Mysql/CodeVerifications'
import { CodeVerificationsInterface } from 'App/Interfaces/MysqlModels'

type VerificationCode = string

export default class CodeVerificationsService {
  public async createNewRegistrationCode(
    type: string,
    userCode: string
  ): Promise<VerificationCode> {
    try {
      let vc = this.getCode()
      let isExists = false
      do {
        isExists = await this.checkCodeExists(vc)
        if (isExists) vc = this.getCode()
      } while (isExists)
      const data: CodeVerificationsInterface = {
        userCode,
        codeType: type,
        code: vc,
        ttl: DateUTC()
          .plus({ hours: 2 * 24 })
          .toSQLDate(),
        createdAt: DateTimeNowISO(),
      }
      const res = await CodeVerifications.create(data)
      const verificationCode: string = res.toJSON().code
      return verificationCode
    } catch (err) {
      throw err
    }
  }

  private async checkCodeExists(verificationCode: string): Promise<boolean> {
    try {
      const res = await CodeVerifications.findBy('code', verificationCode)
      if (res) return true
      else return false
    } catch (err) {
      throw err
    }
  }

  private getCode() {
    return randomString(4, { number: true })
  }
}
