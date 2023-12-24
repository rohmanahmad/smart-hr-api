import ClientModel from 'App/Models/Mysql/Clients'
import ClientAdmins from 'App/Models/Mysql/ClientAdmins'
import { DateTimeNowISO, randomString } from 'App/Helpers/Utilities'
import { ClientAdminInterface, ClientsInterface } from 'App/Interfaces/MysqlModels'
import Logger from '@ioc:Adonis/Core/Logger'

type ClientCode = string
type IndexId = number

class PrivateClientService {
  protected async checkIfExists(code: string): Promise<boolean> {
    Logger.info('Check is-Existing Client Before Creating New Client: %s', code)
    const data = await ClientModel.findBy('code', code)
    if (data) return true // code already exists
    return false
  }

  protected async getRandomCode(): Promise<string> {
    Logger.info('Generating Code For New Client')
    let code = randomString(3, { alphabetPre: true })
    // check if exists by code
    let isExists = true
    do {
      isExists = await this.checkIfExists(code)
      if (isExists) code = randomString(3, { alphabetPre: true })
    } while (isExists)
    return code
  }

  protected getRandomName(): string {
    /* 
    role:
    - total of characters are 10
    - include alpha-numeric 
    - starts with alphabet
    */
    return randomString(10, { alphabetPre: true })
  }
}

export default class ClientServie extends PrivateClientService {
  constructor() {
    super()
  }
  public async createNewClient(): Promise<ClientCode> {
    try {
      Logger.info('Creating New Client')
      const data: ClientsInterface = {
        // _id: null,
        code: await this.getRandomCode(),
        name: this.getRandomName(),
        // subscriptionId: null,
        createdAt: DateTimeNowISO(),
        // updatedAt: null,
      }
      const res = await ClientModel.create(data)
      const clientCode: string = res.toJSON().code
      return clientCode
    } catch (error) {
      throw error
    }
  }

  public async createRelationAdminClient({ clientCode, userCode, companyCode }): Promise<IndexId> {
    try {
      Logger.info('Creating and Assign To Admin Client: %o', { clientCode, userCode, companyCode })
      const data: ClientAdminInterface = {
        clientCode,
        userCode,
        companyCode,
        createdAt: DateTimeNowISO(),
      }
      const q = await ClientAdmins.create(data)
      const id: number = q.toJSON().id
      return id
    } catch (err) {
      throw err
    }
  }

  public async deleteClientRelation(relationId: number) {
    try {
      Logger.info('Remove Assignment Admin Client: %o', { relationId })
      const data = await ClientAdmins.findByOrFail('id', relationId)
      await data.delete()
    } catch (err) {
      throw err
    }
  }

  public async deleteClient(clientCode: string) {
    try {
      Logger.info('Deleting Client: %o', { clientCode })
      const data = await ClientModel.findByOrFail('code', clientCode)
      await data.delete()
    } catch (err) {
      throw err
    }
  }
  public async getClientAdminInformation(userCode: string) {
    try {
      Logger.info('Creating and Assign To Admin Client: %o', { userCode })
      const q = await ClientAdmins.query()
        .where({ userCode })
        .leftJoin('user_accounts', 'user_accounts.code', 'client_admins.userCode')
      console.log(q)
    } catch (err) {
      throw err
    }
  }
}
