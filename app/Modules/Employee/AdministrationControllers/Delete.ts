import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EmployeeService from 'App/Services/Employees'

export default class EmployeeDelete {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const { employeeCode } = request.body()
      await this.deleteEmployee(employeeCode)
      response.apiCollection({})
    } catch (err) {
      throw err
    }
  }

  private async deleteEmployee(code) {
    try {
      const es = new EmployeeService()
      await es.deleteEmployee(code)
      return true
    } catch (err) {
      throw err
    }
  }
}
