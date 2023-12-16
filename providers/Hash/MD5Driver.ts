import { HashDriverContract } from '@ioc:Adonis/Core/Hash'
import md5 from 'md5'

export class MD5Driver implements HashDriverContract {
  public async make(value: string) {
    return md5(value)
  }

  public async verify(hashedValue: string, plainText: string) {
    return hashedValue === md5(plainText)
  }
}
