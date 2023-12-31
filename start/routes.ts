/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return {
    name: 'Ripple10 API',
    version: '3.0.0',
  }
})
Route.get('/api/v3', async () => {
  return {
    name: 'Ripple10 API',
    version: '3.0.0',
  }
})

import 'App/Modules/Authentication/Routes'
import 'App/Modules/Documentation/Routes'
