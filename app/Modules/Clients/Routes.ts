import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/info', 'ClientInfoController')
  Route.post('/info/update', 'UpdateClientInfoController')
})
  .prefix('/api/v1/client')
  .namespace('App/Modules/Clients/Controllers')
