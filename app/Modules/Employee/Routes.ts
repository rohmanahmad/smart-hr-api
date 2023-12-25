import Route from '@ioc:Adonis/Core/Route'

// signed account routes
Route.group(() => {
  Route.get('/info', 'EmployeeInfoController')
  Route.post('/create', 'CreateEmployeeController')
})
  .prefix('/api/v1/employee/')
  .namespace('App/Modules/Employee/Controllers')
