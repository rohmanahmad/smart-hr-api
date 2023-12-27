import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/info', 'CompanyInfo')
  Route.post('/info/update', 'UpdateCompanyInfo')
})
  .prefix('/api/v1/company')
  .namespace('App/Modules/Companies/Controllers')

Route.group(() => {
  Route.get('/list', 'List')
  Route.post('/create', 'Create')
  Route.post('/update', 'Update')
  Route.post('/delete', 'Delete')
})
  .prefix('/api/v1/administration/company')
  .namespace('App/Modules/Clients/AdministrationControllers')
