import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EmployeeService from 'App/Services/Employees'

export default class EmployeeUpdate {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const { code } = request.body()
      await this.updateEmployee(code, request.body())
      response.apiCollection({})
    } catch (err) {
      throw err
    }
  }

  private async updateEmployee(code: string, input: object): Promise<boolean> {
    try {
      const es = new EmployeeService()
      await es.updateEmployee(code, input)
      return true
    } catch (err) {
      throw err
    }
  }
}
