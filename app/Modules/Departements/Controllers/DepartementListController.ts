import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DepartementService from 'App/Services/Departements'

export default class DepartementListController {
  public async handle({ response }: HttpContextContract) {
    try {
      const data = await this.departementList()
      response.apiCollection({ data })
    } catch (err) {
      response.apiError(err)
    }
  }

  private async departementList() {
    try {
      const ds = new DepartementService()
      const listData = await ds.departementList()
      return listData
    } catch (err) {
      throw err
    }
  }
}
