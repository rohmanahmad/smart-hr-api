import Mongoose from 'mongoose'
import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { AdonisMongoose } from './AdonisMongoose'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready, when this file is loaded by the framework.
| Hence, the level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
  |   const Database = (await import('@ioc:Adonis/Lucid/Database')).default
  |   const Event = (await import('@ioc:Adonis/Core/Event')).default
  |   Event.on('db:query', Database.prettyPrint)
  | }
  |
  */

interface MongooseConfig {
  name: string
  uri: string
}
export default class MongooseProvider {
  constructor(
    // protected ioc: IocContract,
    protected app: ApplicationContract
  ) {}

  public register() {
    // Register your own bindings for the default MongoDB connection
    this.app.container.singleton('Provider/Mongoose', () => new AdonisMongoose())
  }

  public async boot() {
    // All bindings are ready, feel free to use them
    const Logger = this.app.container.use('Adonis/Core/Logger')
    const Config = this.app.container.use('Adonis/Core/Config')
    const adonisMongoose = this.app.container.use('Provider/Mongoose')

    // Check how many connection connectionURI have been defined
    const connections: MongooseConfig[] = Config.get('mongodb.mongoose')
    if (connections && connections.length === 0) {
      // No configuration!
      Logger.error('No Mongoose configuration has been defined')
      throw new Error('No Mongoose configuration has been defined!')
    } else if (connections && connections.length === 1) {
      // Create a single connection as the default
      const connection: MongooseConfig = connections[0]
      const conn = await this.connect(connection.uri)
      if (!conn) throw new Error('Unable to establish the Mongoose connection')
      adonisMongoose.add(connection.name, conn, true)
    } else {
      // Creating multiple, named connections
      await Promise.all(
        connections.map(async (config) => {
          const conn = await this.connect(config.uri)
          if (!conn) throw new Error('Unable to establish the Mongoose connection')
          adonisMongoose.add(config.name, conn, config.name === 'Default')
        })
      )
    }
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
    const Logger = this.app.container.use('Adonis/Core/Logger')
    await Mongoose.connection.close()
    Logger.info('Mongoose connection closed')
  }

  private async connect(uri: string) {
    const Logger = this.app.container.use('Adonis/Core/Logger')
    try {
      // Check the Config object: if there's a connection URI and use that, otherwise use the configuration
      Logger.info('Connecting using: %s ...', uri)

      // Make the database connection
      if (!uri) throw new Error('Invalid Config For Mongodb URI!')
      const conn = Mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
      })
      Logger.info('Mongoose connected')
      return conn
    } catch (e) {
      Logger.error('%s (%s)', e.message, uri)
    }
  }
}
