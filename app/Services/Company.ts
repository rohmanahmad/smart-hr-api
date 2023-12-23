import { randomString, DateTimeNowISO } from 'App/Helpers/Utilities'
import { CompaniesInterface } from 'App/Interfaces/MysqlModels'
import CompaniesModel from 'App/Models/Mysql/Companies'

type CompanyCode = string

export default class CompanyService {
  public async createNewCompany(companyName: string): Promise<CompanyCode> {
    try {
      const data: CompaniesInterface = {
        code: await this.getRandomCode(),
        name: companyName,
        // description: null,
        // address: null,
        // cityId: null,
        // provinceId: null,
        // postalCode: null,
        // phoneNumber1: null,
        // phoneNumber2: null,
        // email: null,
        // website: null,
        createdAt: DateTimeNowISO(),
        // updatedAt: null,
      }
      const res = await CompaniesModel.create(data)
      const companyCode: string = res.toJSON().code
      return companyCode
    } catch (err) {
      throw err
    }
  }

  public async deleteCompany(companyCode: string) {
    try {
      const data = await CompaniesModel.findByOrFail('code', companyCode)
      await data.delete()
    } catch (err) {
      throw err
    }
  }
  private async checkIfExists(code: string): Promise<boolean> {
    const data = await CompaniesModel.findBy('code', code)
    if (data) return true // code already exists
    return false
  }
  private async getRandomCode(): Promise<string> {
    let code = randomString(3, { alphabetPre: true })
    // check if exists by code
    let isExists = true
    do {
      isExists = await this.checkIfExists(code)
      if (isExists) code = randomString(3, { alphabetPre: true })
    } while (isExists)
    return code
  }

  public validateCompanyName(name: string): boolean {
    /* 
    rules:
    - min characters 2
    */
    if (!name) throw new Error('Invalid Company Name')
    if (name.length < 2) throw new Error('Company Name must be at lease 2 characters')
    return true
  }
}
