import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CompanyService from 'App/Services/Company'

export default class UpdateCompanyInfoController {
  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      const { code } = request.body()
      await this.updateCompanyByCode(code, request.body())

      response.apiSuccess({})
    } catch (err) {
      response.apiError(err)
    }
  }

  private async updateCompanyByCode(code: string, input: object): Promise<boolean> {
    try {
      const cs = new CompanyService()
      await cs.updateCompanyInfo(code, input)
      return true
    } catch (err) {
      throw err
    }
  }
}
