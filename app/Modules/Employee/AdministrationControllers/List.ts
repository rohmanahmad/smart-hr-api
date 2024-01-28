import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EmployeeService from 'App/Services/Employees'

export default class EmployeeList {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const data = await this.employeeAdminList()
      response.apiCollection({ data })
    } catch (err) {
      throw err
    }
  }

  private async employeeAdminList() {
    try {
      const es = new EmployeeService()
      const data = await es.employeeAdminList()
      return data
    } catch (err) {
      throw err
    }
  }
}
