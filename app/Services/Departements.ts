import Logger from '@ioc:Adonis/Core/Logger'
import { DepartementsInterface } from 'App/Interfaces/MysqlModels'
import { DateTimeNowISO, randomString } from 'App/Helpers/Utilities'
import Departements from 'App/Models/Mysql/Departements'

export default class DepartementService {
  private async checkIfExists(code: string): Promise<boolean> {
    Logger.info('Check is-Existing Client Before Creating New Departement: %s', code)
    const data = await Departements.findBy('code', code)
    if (data) return true // code already exists
    return false
  }

  private async getRandomCode(): Promise<string> {
    Logger.info('Generating Code For New Departements')
    let code = randomString(3, { alphabetPre: true })
    // check if exists by code
    let isExists = true
    do {
      isExists = await this.checkIfExists(code)
      if (isExists) code = randomString(3, { alphabetPre: true })
    } while (isExists)
    return code
  }
  public async createNewDepartement({ companyCode, name, description }): Promise<string> {
    try {
      Logger.info('creating new client')
      const data: DepartementsInterface = {
        code: await this.getRandomCode(),
        companyCode,
        name,
        description,
        createdAt: DateTimeNowISO(),
      }

      const res = await Departements.create(data)
      const departementCode: string = res.toJSON().code

      return departementCode
    } catch (err) {
      throw err
    }
  }
}
