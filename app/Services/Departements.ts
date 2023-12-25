import Logger from '@ioc:Adonis/Core/Logger'
import { DepartementsInterface } from 'App/Interfaces/MysqlModels'
import { randomString } from 'App/Helpers/Utilities'
import Departements from 'App/Models/Mysql/Departements'
import { DateTimeNowISO } from 'App/Helpers/Date'

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

  public async updateDepartementByCode(code: string, input): Promise<boolean> {
    try {
      const { name, description } = input
      const q = await Departements.findByOrFail('code', code)
      if (!q) throw new Error('invalid departement code')
      q.name = name
      q.description = description
      q.updatedAt = DateTimeNowISO()
      await q.save()
      return true
    } catch (err) {
      throw err
    }
  }

  public async deleteDepartementByCode(code: string): Promise<boolean> {
    try {
      const q = await Departements.findBy('code', code)
      await q?.delete()
      return true
    } catch (err) {
      throw err
    }
  }

  public async departementList(): Promise<Array<DepartementsInterface>> {
    const q = await Departements.all({})
    const data = q?.map((x) => x.toJSON()) as Array<DepartementsInterface>
    return data
  }

  public async getDepartementInfo(code: string): Promise<DepartementsInterface> {
    try {
      const q = await Departements.findBy('code', code)
      const data = q?.toJSON() as DepartementsInterface
      return data
    } catch (err) {
      throw err
    }
  }
}
