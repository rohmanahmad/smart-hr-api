import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'

const isDev = Env.get('NODE_ENV', 'production') !== 'production'

declare module '@ioc:Adonis/Core/Response' {
  interface ResponseContract {
    apiSuccess(message: any, debugdata?: {}): this
    apiError(data: {}, debugdata?: {}): this
    apiCollection(data: {}, debugdata?: {}): this
  }
}

type ResponseApiCollectionData = {
  debug?: {}
}

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    const Response = this.app.container.use('Adonis/Core/Response')
    Response.macro('apiSuccess', function () {
      this.ctx!.response.status(200).send({ status: 200, message: 'success' })
      return this
    })
    Response.macro('apiError', function (error: Error) {
      this.ctx?.logger.error(error.message)
      this.ctx!.response.status(500).send({ status: 500, message: error?.message })
      return this
    })
    Response.macro('apiCollection', function (data: ResponseApiCollectionData, debugData = {}) {
      if (isDev) {
        if (data) data.debug = debugData
      }
      this.ctx!.response.status(200).send({ status: 200, message: 'Success Retrieve', data })
      return this
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
