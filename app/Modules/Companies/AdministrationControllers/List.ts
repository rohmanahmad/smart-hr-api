import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CompanyService from 'App/Services/Company'

export default class List {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const data = await this.getList()
      response.apiCollection({ data })
    } catch (err) {
      throw err
    }
  }

  private async getList() {
    try {
      const cs = new CompanyService()
      const data = await cs.companyList()
      return data
    } catch (err) {
      throw err
    }
  }
}
