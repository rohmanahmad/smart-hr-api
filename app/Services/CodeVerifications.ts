import { randomString } from 'App/Helpers/Utilities'
import CodeVerifications from 'App/Models/Mysql/CodeVerifications'
import { CodeVerificationsInterface } from 'App/Interfaces/MysqlModels'
import { DateTimeNowISO, DateUTC } from 'App/Helpers/Date'

type VerificationCode = string

export default class CodeVerificationsService {
  private async createNewVerificationCode(
    userCode: string,
    codeType: CodeVerificationsInterface['codeType']
  ): Promise<VerificationCode> {
    const data: CodeVerificationsInterface = {
      userCode,
      codeType,
      code: await this.getCode(),
      ttl: DateUTC()
        .plus({ hours: 2 * 24 })
        .toSQLDate(),
      createdAt: DateTimeNowISO(),
    }
    const res = await CodeVerifications.create(data)
    const verificationCode: string = res.toJSON().code
    return verificationCode
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

  private async getCode(): Promise<string> {
    let vc = randomString(4, { number: true })
    let isExists = false
    do {
      isExists = await this.checkCodeExists(vc)
      if (isExists) vc = randomString(4, { number: true })
    } while (isExists)
    return vc
  }

  public async createNewRegistrationCode(userCode: string): Promise<VerificationCode> {
    try {
      const code = await this.createNewVerificationCode(userCode, 'registration')
      return code
    } catch (err) {
      throw err
    }
  }

  public async createNewForgotPasswordCode(userCode: string): Promise<VerificationCode> {
    try {
      const code = await this.createNewVerificationCode(userCode, 'forgot-password')
      return code
    } catch (err) {
      throw err
    }
  }
}
