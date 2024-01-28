import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DepartementService from 'App/Services/Departements'

export default class Delete {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const { departementCode } = request.body()
      await this.deleteDepartement(departementCode)
      response.apiCollection({})
    } catch (err) {
      throw err
    }
  }

  private async deleteDepartement(departementCode: string) {
    try {
      const ds = new DepartementService()
      await ds.deleteDepartementByCode(departementCode)
    } catch (err) {
      throw err
    }
  }
}
