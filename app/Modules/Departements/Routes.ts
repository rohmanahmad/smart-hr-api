import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'CreateDepartement')
  Route.post('/update', 'UpdateDepartement')
  Route.get('/delete', 'DeleteDepartement')
  Route.get('/list', 'DepartementList')
  Route.get('/info', 'DepartementInfo')
})
  .prefix('/api/v1/departement/')
  .namespace('App/Modules/Departements/Controllers')

Route.group(() => {
  Route.get('/list', 'List')
  Route.post('/create', 'Create')
  Route.put('/update', 'Update')
  Route.delete('/delete', 'Delete')
})
  .prefix('/api/v1/administration/departements')
  .namespace('App/Modules/Departements/AdministrationControllers')
