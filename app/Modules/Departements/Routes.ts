import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'CreateDepartementController')
})
  .prefix('/api/v1/departement/')
  .namespace('App/Modules/Departements/Controllers')
