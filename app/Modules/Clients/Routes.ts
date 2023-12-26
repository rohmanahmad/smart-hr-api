import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/info', 'ClientInfo')
  Route.post('/info/update', 'UpdateClientInfo')
})
  .prefix('/api/v1/client')
  .namespace('App/Modules/Clients/Controllers')

Route.group(() => {
  Route.get('/list', 'List')
  Route.post('/create', 'Create')
  Route.post('/update', 'Update')
  Route.post('/delete', 'Delete')
})
  .prefix('/api/v1/administration/client')
  .namespace('App/Modules/Clients/AdministrationControllers')
