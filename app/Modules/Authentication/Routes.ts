import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthenticationLogin')
  Route.post('/forgot-password', 'ForgotPassword')
})
  .prefix('/api/v1/auth')
  .namespace('App/Modules/Authentication/Controllers')

Route.group(() => {
  Route.post('/login', 'UserAdminAuthenticationLogin')
  Route.post('/forgot-password', 'ForgotPassword')
})
  .prefix('/api/v1/auth/administration')
  .namespace('App/Modules/Authentication/AdministrationControllers')
