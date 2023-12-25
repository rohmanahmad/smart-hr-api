import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTimeNowISO } from 'App/Helpers/Date'
import {
  DepartementsInterface,
  EmployeesInterface,
  ProfilesInterface,
  UserAccountsInterface,
} from 'App/Interfaces/MysqlModels'
import DepartementService from 'App/Services/Departements'
import EmployeeService from 'App/Services/Employees'
import Profiles from 'App/Services/Profiles'
import UserService from 'App/Services/User'

export default class CreateDepartementController {
  public async handle({ request, response }: HttpContextContract) {
    try {
      const { email, firstName, lastName, departementCode, userName } = request.body()
      const departementInfo = await this.getDepartementInfo(departementCode)
      const { userCode } = await this.createUser(email, userName, departementInfo.companyCode)
      const profileCode = await this.createProfile(firstName, lastName)
      await this.createEmployee({
        companyCode: departementInfo.companyCode,
        userCode,
        departementCode,
        profileCode,
      })
      response.apiSuccess({})
    } catch (err) {
      response.apiError(err)
    }
  }

  private async createEmployee({
    companyCode,
    userCode,
    departementCode,
    profileCode,
  }): Promise<EmployeesInterface['code']> {
    const es = new EmployeeService()
    const employeeCode = await es.createNewEmployee({
      code: [companyCode, userCode].join('-'),
      companyCode,
      departementCode,
      userCode,
      profileCode,
      employmentStatus: 'contract',
      createdAt: DateTimeNowISO(),
    })
    return employeeCode
  }

  private async getDepartementInfo(
    departementCode: DepartementsInterface['code']
  ): Promise<DepartementsInterface> {
    const ds = new DepartementService()
    const departementData = await ds.getDepartementInfo(departementCode)
    return departementData
  }

  private async createUser(
    email: string,
    username: string,
    companyCode: DepartementsInterface['companyCode']
  ): Promise<{ userCode: UserAccountsInterface['code']; newPassword: string }> {
    const cs = new UserService()
    const { userCode, newPassword } = await cs.createNewAccount({ email, username, companyCode })
    return { userCode, newPassword }
  }

  private async createProfile(
    firstName: ProfilesInterface['firstName'],
    lastName: ProfilesInterface['lastName']
  ): Promise<string> {
    const ps = new Profiles()
    const profilCode = await ps.createNewProfile(firstName, lastName)
    return profilCode
  }
}
