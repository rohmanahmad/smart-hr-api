/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  DEBUG: Env.schema.string.optional(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  // APP
  // APP_KEY: Env.schema.string(),
  // SERVER_NAME: Env.schema.string(),
  // MYSQL Database
  // MYSQL_HOST: Env.schema.string({ format: 'host' }),
  // MYSQL_PORT: Env.schema.number(),
  // MYSQL_USER: Env.schema.string(),
  // MYSQL_PASSWORD: Env.schema.string(),
  // MYSQL_DB_NAME: Env.schema.string(),

  // MONGO_DSN: Env.schema.string(),
  // QUERY_MAX_TIME_MS: Env.schema.number(),

  // REDIS_CONNECTION: Env.schema.string(),
  // REDIS_HOST: Env.schema.string({ format: 'host' }),
  // REDIS_PORT: Env.schema.number.optional(),
  // REDIS_PASSWORD: Env.schema.string.optional(),
  // REDIS_DB: Env.schema.number(),
  // REDIS_PREFIX: Env.schema.string.optional(),
  // // webhooks
  // WEBHOOK_DC_FOR_LOGIN: Env.schema.string.optional(),
})
