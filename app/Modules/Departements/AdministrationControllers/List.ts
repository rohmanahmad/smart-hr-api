import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DepartementService from 'App/Services/Departements'

export default class List {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const data = await this.departementAdminList()
      response.apiCollection({ data })
    } catch (err) {
      throw err
    }
  }

  private async departementAdminList() {
    try {
      const ds = new DepartementService()
      const data = await ds.departementAdminList()
      return data
    } catch (err) {
      throw err
    }
  }
}
