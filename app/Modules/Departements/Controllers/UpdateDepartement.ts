import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DepartementService from 'App/Services/Departements'

export default class UpdateDepartementInfoController {
  public async handle({ request, response }: HttpContextContract) {
    try {
      const { code } = request.body()
      await this.updateDepartementByCode(code, request.body())
      response.apiSuccess({})
    } catch (err) {
      response.apiError(err)
    }
  }

  private async updateDepartementByCode(code: string, input: object): Promise<boolean> {
    const ds = new DepartementService()
    await ds.updateDepartementByCode(code, input)
    return true
  }
}
