import { DateTimeNowISO, randomString } from 'App/Helpers/Utilities'
import ProfileModel from 'App/Models/Mysql/Profiles'

type ProfileCode = string

export default class Profiles {
  public async createProfile({ firstName, lastName }): Promise<ProfileCode> {
    try {
      const data = {
        code: this.getRandomCode(),
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

  private getRandomCode(): string {
    return randomString(5, { alphabetLo: true, alphabetPre: true, number: true })
  }
}
