import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DepartementService from 'App/Services/Departements'

export default class CreateDepartementController {
  public async handle({ request, response }: HttpContextContract) {
    try {
      const { companyCode, name, description } = request.body()
      await this.createDepartement({ companyCode, name, description })
      response.apiSuccess({})
    } catch (err) {
      response.apiError(err)
    }
  }

  private async createDepartement({ companyCode, name, description }): Promise<string> {
    try {
      const cs = new DepartementService()
      const departementCode = await cs.createNewDepartement({ companyCode, name, description })
      return departementCode
    } catch (err) {
      throw err
    }
  }
}
