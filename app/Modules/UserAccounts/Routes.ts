import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/register', 'UserAccountRegistrationController')
})
  .prefix('/api/v1/account/guest/')
  .namespace('App/Modules/UserAccounts/Controllers')

// signed account routes
Route.group(() => {
  Route.get('/activities', 'UserAccountActivitiesController')
})
  .prefix('/api/v1/account/')
  .namespace('App/Modules/UserAccounts/Controllers')
