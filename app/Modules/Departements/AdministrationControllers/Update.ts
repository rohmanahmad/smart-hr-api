import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DepartementService from 'App/Services/Departements'

export default class Update {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const { code } = request.body()
      await this.updateDepartement(code, request.body())
      response.apiCollection({})
    } catch (err) {
      throw err
    }
  }

  private async updateDepartement(code: string, input: object): Promise<boolean> {
    const ds = new DepartementService()
    await ds.updateDepartementByCode(code, input)
    return true
  }
}
