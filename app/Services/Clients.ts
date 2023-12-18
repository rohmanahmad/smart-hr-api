import ClientModel from 'App/Models/Mysql/Clients'

type ClientId = number

export default class ClientServie {
  public async createNewClient(): Promise<ClientId> {
    try {
      const data = {
        // _id: null,
        name: this.getRandomName(),
        // subscriptionId: null,
        // updatedAt: null,
      }
      const res = await ClientModel.create(data)
      const clientId: number = res.toJSON()._id
      return clientId
    } catch (error) {
      throw error
    }
  }

  private getRandomName(): string {
    /* 
    role:
    - total of characters are 10
    - include alpha-numeric 
    - starts with alphabet
    */

    return ''
  }
}
