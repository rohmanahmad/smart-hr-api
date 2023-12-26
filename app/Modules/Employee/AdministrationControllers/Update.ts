import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmployeeUpdate {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      response.apiCollection({})
    } catch (err) {
      throw err
    }
  }
}
