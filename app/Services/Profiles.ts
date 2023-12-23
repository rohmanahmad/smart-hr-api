import { DateTimeNowISO, randomString } from 'App/Helpers/Utilities'
import { ProfilesInterface } from 'App/Interfaces/MysqlModels'
import ProfileModel from 'App/Models/Mysql/Profiles'

type ProfileCode = string

export default class Profiles {
  public async createProfile({ firstName, lastName }): Promise<ProfileCode> {
    try {
      const data: ProfilesInterface = {
        code: await this.getRandomCode(),
        firstName,
        lastName,
        // pictureUrl: '',
        // address: '',
        // locationCode: '',
        // birthDate: '',
        // gender: '',
        createdAt: DateTimeNowISO(),
        // updatedAt: null
      }
      const res = await ProfileModel.create(data)
      const profileCode: string = res.toJSON().code
      return profileCode
    } catch (err) {
      throw err
    }
  }

  public async deleteProfile(profileCode: string) {
    try {
      const data = await ProfileModel.findByOrFail('code', profileCode)
      await data.delete()
    } catch (err) {
      throw err
    }
  }

  private async checkIfExists(code: string): Promise<boolean> {
    const data = await ProfileModel.findBy('code', code)
    if (data) return true // code already exists
    return false
  }

  private async getRandomCode(): Promise<string> {
    let code = randomString(5, { alphabetLo: true, alphabetPre: true, number: true })
    // check if exists by code
    let isExists = true
    do {
      isExists = await this.checkIfExists(code)
      if (isExists) code = randomString(5, { alphabetLo: true, alphabetPre: true, number: true })
    } while (isExists)
    return code
  }
}
