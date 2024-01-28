import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EmployeeService from 'App/Services/Employees'

export default class EmployeeCreate {
  public async handle({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const {
        userCode,
        companyCode,
        departementCode,
        profileCode,
        employmentStatus,
        salary,
        jobPosition,
        hireDate,
      } = request.body()
      const employeeCode = await this.createEmployee({
        userCode,
        companyCode,
        departementCode,
        profileCode,
        employmentStatus,
        salary,
        jobPosition,
        hireDate,
      })
      response.apiCollection({ code: employeeCode })
    } catch (err) {
      throw err
    }
  }

  private async createEmployee({
    userCode,
    companyCode,
    departementCode,
    profileCode,
    employmentStatus,
    salary,
    jobPosition,
    hireDate,
  }) {
    const es = new EmployeeService()
    const employeeCode = es.createEmployee({
      userCode,
      companyCode,
      departementCode,
      profileCode,
      employmentStatus,
      salary,
      jobPosition,
      hireDate,
    })
    return employeeCode
  }
}
