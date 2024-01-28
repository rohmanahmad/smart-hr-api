import { EmployeesInterface } from 'App/Interfaces/MysqlModels'
import Logger from '@ioc:Adonis/Core/Logger'
import EmployeesModel from 'App/Models/Mysql/Employees'
import { DateTimeNowISO } from 'App/Helpers/Date'

export default class EmployeeService {
  public async createNewEmployee(item: EmployeesInterface): Promise<EmployeesInterface['code']> {
    const isExists = await this.isExistsEmployee(item.code)
    if (isExists) throw new Error('Employee Code Already Exists')
    const q = await EmployeesModel.create(item)
    const employeeCode = q.toJSON().code
    return employeeCode
  }

  private async isExistsEmployee(employeeCode: EmployeesInterface['code']): Promise<boolean> {
    const q = await EmployeesModel.findBy('code', employeeCode)
    if (q) return true
    else return false
  }

  public async employeeAdminList() {
    const q = await EmployeesModel.all()
    const data = q.map((x) => x.toJSON())
    return data
  }

  public async createEmployee({
    userCode,
    companyCode,
    departementCode,
    profileCode,
    employmentStatus,
    salary,
    jobPosition,
    hireDate,
  }): Promise<EmployeesInterface['code']> {
    try {
      Logger.info('creating employee')
      const data: EmployeesInterface = {
        code: [companyCode, userCode].join('-'),
        userCode,
        companyCode,
        departementCode,
        profileCode,
        employmentStatus,
        salary,
        jobPosition,
        hireDate,
        createdAt: DateTimeNowISO(),
      }
      const res = await EmployeesModel.create(data)
      const employeeCode = await res.toJSON().code
      return employeeCode
    } catch (err) {
      throw err
    }
  }

  public async updateEmployee(code: string, input) {
    try {
      const { employmentStatus, salary, jobPosition } = input
      const q = await EmployeesModel.findByOrFail('code', code)
      if (!q) throw new Error('invalid employee code')
      q.employmentStatus = employmentStatus
      q.salary = salary
      q.jobPosition = jobPosition
      q.updatedAt = DateTimeNowISO()
      await q.save()
    } catch (err) {
      throw err
    }
  }

  public async deleteEmployee(code) {
    try {
      const data = await EmployeesModel.findByOrFail('code', code)
      if (!data) throw new Error('Invalid Employee Code')
      await data.delete()
      return true
    } catch (err) {
      throw err
    }
  }
}
