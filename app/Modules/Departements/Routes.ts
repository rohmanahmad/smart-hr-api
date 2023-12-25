import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'CreateDepartementController')
  Route.post('/update', 'UpdateDepartementController')
  Route.get('/delete', 'DeleteDepartementController')
  Route.get('/list', 'DepartementListController')
  Route.get('/info', 'DepartementInfoController')
})
  .prefix('/api/v1/departement/')
  .namespace('App/Modules/Departements/Controllers')
