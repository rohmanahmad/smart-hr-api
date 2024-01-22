import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/register', 'UserAccountRegistration')
})
  .prefix('/api/v1/account/guest/')
  .namespace('App/Modules/UserAccounts/Controllers')

// signed account routes
Route.group(() => {
  Route.get('/activities', 'UserAccountActivities')
})
  .prefix('/api/v1/account/')
  .namespace('App/Modules/UserAccounts/Controllers')

Route.group(() => {
  Route.get('/list', 'List')
  Route.post('/create', 'Create')
  Route.post('/update', 'Update')
  Route.delete('/delete', 'Delete')
})
  .prefix('/api/v1/administration/user-accounts')
  .namespace('App/Modules/UserAccounts/AdministrationControllers')
