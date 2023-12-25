import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CompanyService from 'App/Services/Company'

export default class CompanyinfoController {
  public async handle({ request, response }: HttpContextContract): Promise<void> {
    try {
      const { companyCode } = request.qs()
      const data = await this.getCompanyInfo(companyCode)
      response.apiCollection(data)
    } catch (err) {
      response.apiError(err)
    }
  }

  private async getCompanyInfo(companyCode: string): Promise<object> {
    try {
      const cs = new CompanyService()
      const data = await cs.getCompanyInfoByCode(companyCode)
      return data
    } catch (err) {
      throw err
    }
  }
}
