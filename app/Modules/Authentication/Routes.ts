import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthenticationLoginController')
})
  .prefix('/api/v1/auth')
  .namespace('App/Modules/Authentication/Controllers')
