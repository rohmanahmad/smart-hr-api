import CompaniesModel from 'App/Models/Mysql/Companies'

type CompanyId = number

export default class CompanyService {
  public async createNewCompany(clientId: number, companyName: string): Promise<CompanyId> {
    try {
      const data = {
        clientId,
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
      const companyId: number = res.toJSON()._id
      return companyId
    } catch (err) {
      throw err
    }
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
