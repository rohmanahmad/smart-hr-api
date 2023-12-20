import ClientModel from 'App/Models/Mysql/Clients'
import ClientAdmins from 'App/Models/Mysql/ClientAdmins'
import { DateTimeNowISO, randomString } from 'App/Helpers/Utilities'

type ClientCode = string
type IndexId = number

export default class ClientServie {
  public async createNewClient(): Promise<ClientCode> {
    try {
      const data = {
        // _id: null,
        code: this.getRandomCode(),
        name: this.getRandomName(),
        // subscriptionId: null,
        // updatedAt: null,
      }
      // check if exists by code
      let isExists = true
      do {
        isExists = await this.checkIfExists(data.code)
      } while (isExists)
      const res = await ClientModel.create(data)
      const clientCode: string = res.toJSON().code
      return clientCode
    } catch (error) {
      throw error
    }
  }

  public async createRelationAdminClient({ clientCode, userCode }): Promise<IndexId> {
    try {
      const q = await ClientAdmins.create({
        clientCode,
        userCode,
        createdAt: DateTimeNowISO(),
      })
      const id: number = q.toJSON().id
      return id
    } catch (err) {
      throw err
    }
  }

  public async deleteClientRelation(relationId: number) {
    try {
      const data = await ClientAdmins.findByOrFail('id', relationId)
      await data.delete()
    } catch (err) {
      throw err
    }
  }

  public async deleteClient(clientCode: string) {
    try {
      const data = await ClientModel.findByOrFail('code', clientCode)
      await data.delete()
    } catch (err) {
      throw err
    }
  }

  private async checkIfExists(code: string): Promise<boolean> {
    const data = await ClientModel.findBy('code', code)
    if (data) return true // code already exists
    return false
  }

  private getRandomCode(): string {
    return randomString(3, { alphabetPre: true })
  }

  private getRandomName(): string {
    /* 
    role:
    - total of characters are 10
    - include alpha-numeric 
    - starts with alphabet
    */
    return randomString(10, { alphabetPre: true })
  }
}
