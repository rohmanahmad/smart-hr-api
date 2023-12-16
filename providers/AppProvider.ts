import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    const { MD5Driver } = await import('./Hash/MD5Driver')
    const Hash = this.app.container.use('Adonis/Core/Hash')
    Hash.extend('md5', () => {
      return new MD5Driver()
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
