import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/info', 'CompanyInfoController')
})
  .prefix('/api/v1/company')
  .namespace('App/Modules/Companies/Controllers')

Route.group(() => {
  Route.post('update', 'UpdateCompanyInfoController')
})
  .prefix('/api/v1/company/info')
  .namespace('App/Modules/Companies/Controllers')
