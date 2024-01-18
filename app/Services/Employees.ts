import { EmployeesInterface } from 'App/Interfaces/MysqlModels'
import EmployeesModel from 'App/Models/Mysql/Employees'

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
}
