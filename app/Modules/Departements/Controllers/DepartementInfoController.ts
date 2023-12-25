import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DepartementService from 'App/Services/Departements'

export default class DepartementInfoController {
  public async handle({ request, response }: HttpContextContract): Promise<void> {
    try {
      const { code } = request.qs()
      const data = await this.getDepartementInfo(code)
      response.apiCollection(data)
    } catch (err) {
      response.apiError(err)
    }
  }

  public async getDepartementInfo(code: string): Promise<object> {
    try {
      const ds = new DepartementService()
      const data = await ds.getDepartementInfo(code)
      return data
    } catch (err) {
      throw err
    }
  }
}
