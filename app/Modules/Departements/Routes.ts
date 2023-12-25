import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'CreateDepartementController')
  Route.post('/update', 'UpdateDepartementController')
})
  .prefix('/api/v1/departement/')
  .namespace('App/Modules/Departements/Controllers')
