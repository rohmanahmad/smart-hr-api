import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CompanyService from 'App/Services/Company'

export default class Create {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const {
        name,
        description,
        address,
        locationCode,
        phoneNumber1,
        phoneNumber2,
        email,
        website,
      } = request.body()
      const companyCode = await this.createCompany({
        name,
        description,
        address,
        locationCode,
        phoneNumber1,
        phoneNumber2,
        email,
        website,
      })
      response.apiCollection({ code: companyCode })
    } catch (err) {
      throw response.apiError(err)
    }
  }

  private async createCompany({
    name,
    description,
    address,
    locationCode,
    phoneNumber1,
    phoneNumber2,
    email,
    website,
  }): Promise<string> {
    try {
      const cs = new CompanyService()
      const companyCode = await cs.createCompany({
        name,
        description,
        address,
        locationCode,
        phoneNumber1,
        phoneNumber2,
        email,
        website,
      })
      return companyCode
    } catch (err) {
      throw err
    }
  }
}
