import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/info', 'ClientInfoController')
})
  .prefix('/api/v1/client')
  .namespace('App/Modules/Clients/Controllers')
