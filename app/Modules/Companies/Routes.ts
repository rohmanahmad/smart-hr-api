import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/info', 'CompanyInfoController')
  Route.post('/info/update', 'UpdateCompanyInfoController')
})
  .prefix('/api/v1/company')
  .namespace('App/Modules/Companies/Controllers')
