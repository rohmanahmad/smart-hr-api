import { randomString } from 'App/Helpers/Utilities'
import CompaniesModel from 'App/Models/Mysql/Companies'

type CompanyCode = string

export default class CompanyService {
  public async createNewCompany(companyName: string): Promise<CompanyCode> {
    try {
      const data = {
        code: this.getRandomCode(),
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

  private getRandomCode(): string {
    return randomString(3, { alphabetPre: true })
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
