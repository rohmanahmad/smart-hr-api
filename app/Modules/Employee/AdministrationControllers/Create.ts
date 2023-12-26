import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmployeeCreate {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      response.apiCollection({})
    } catch (err) {
      throw err
    }
  }
}
