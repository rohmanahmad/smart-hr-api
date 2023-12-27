import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EmployeesInterface } from 'App/Interfaces/MysqlModels'
import EmployeeService from 'App/Services/Employees'
import { DateTime } from 'luxon'

type Activity = {
  date: DateTime
  type:
    | 'login'
    | 'register'
    | 'logout'
    | 'forgot-password'
    | 'change-profile-info'
    | 'change-password'
    | 'permit'
    | 'other'
  detail: {}
}

interface ReponseInterface {
  id: number
  properties: {
    page: {
      current: number
      total: number
      next: number | null
      prev: number | null
    }
  }
  activities: Array<Activity>
}

export default class UserAccountActivitiesController {
  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      const { employeeCode } = request.qs()
      const data = await this.getEmployeeInfo(employeeCode)
      response.apiCollection(data)
    } catch (err) {
      response.apiError(err)
    }
  }

  private async getEmployeeInfo(employeeCode: EmployeesInterface['code']): Promise<object> {
    try {
      const es = new EmployeeService()
      const data = es.getEmployeeInfo(employeeCode)
      return data
    } catch (err) {
      throw err
    }
  }
}
