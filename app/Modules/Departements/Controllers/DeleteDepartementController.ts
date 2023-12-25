import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DepartementService from 'App/Services/Departements'

export default class DeleteDepartementController {
  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      const { code } = request.qs()
      await this.deleteDepartementByCode(code)
      response.apiSuccess({})
    } catch (err) {
      response.apiError(err)
    }
  }

  private async deleteDepartementByCode(code: string): Promise<boolean> {
    try {
      const ds = new DepartementService()
      await ds.deleteDepartementByCode(code)
      return true
    } catch (err) {
      throw err
    }
  }
}
