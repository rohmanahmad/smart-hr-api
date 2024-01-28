import Route from '@ioc:Adonis/Core/Route'

// signed account routes
Route.group(() => {
  Route.get('/info', 'EmployeeInfo')
  Route.post('/create', 'CreateEmployee')
})
  .prefix('/api/v1/employee/')
  .namespace('App/Modules/Employee/Controllers')

Route.group(() => {
  Route.get('/list', 'List')
  Route.post('/create', 'Create')
  Route.put('/update', 'Update')
  Route.delete('/delete', 'Delete')
})
  .prefix('/api/v1/administration/employee')
  .namespace('App/Modules/Employee/AdministrationControllers')
