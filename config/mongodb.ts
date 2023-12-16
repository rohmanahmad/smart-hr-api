import Env from '@ioc:Adonis/Core/Env'

export default {
  /**
    |--------------------------------------------------------------------------
    | Mongodb config
    |--------------------------------------------------------------------------
    |
    | Configuration for Mongodb database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i mongoose
    |
    */
  mongoose: [
    {
      name: 'connection-1',
      uri: Env.get('MONGO_DSN'),
    },
  ],
}
