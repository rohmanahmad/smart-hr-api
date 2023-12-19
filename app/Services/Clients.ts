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
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charLength = 10
    let randomName = ''
    randomName += characters.charAt(Math.floor(Math.random() * 52))
    for (let i = 1; i < charLength; i++) {
      let randomIndex = Math.floor(Math.random() * 62)

      randomName += characters.charAt(randomIndex)
    }

    return randomName
  }
}
