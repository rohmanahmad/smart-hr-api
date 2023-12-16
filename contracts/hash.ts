/**
 * Contract source: https://git.io/Jfefs
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import type { InferListFromConfig } from '@adonisjs/core/build/config'
import { MD5Driver } from '../providers/Hash/MD5Driver'
import type hashConfig from '../config/hash'

declare module '@ioc:Adonis/Core/Hash' {
  interface HashersList extends InferListFromConfig<typeof hashConfig> {}
  interface HashDrivers {
    md5: {
      config: {
        driver: 'md5'
      }
      implementation: MD5Driver
    }
  }
}
