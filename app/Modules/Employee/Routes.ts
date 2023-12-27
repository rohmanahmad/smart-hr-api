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
  Route.post('/update', 'Update')
  Route.post('/delete', 'Delete')
})
  .prefix('/api/v1/administration/employees')
  .namespace('App/Modules/Employees/AdministrationControllers')
