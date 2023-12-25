import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthenticationLoginController')
  Route.post('/forgot-password', 'ForgotPasswordController')
})
  .prefix('/api/v1/auth')
  .namespace('App/Modules/Authentication/Controllers')
