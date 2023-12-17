import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/smart-hr', 'V1DocumentationUIController')
  Route.get('/spec.json', 'V1DocumentationSpecController')
  Route.get('/assets/:file', 'DocumentationUIAssetsController')
  // Route.get('/specs/:client', 'WhitelabelDocumentationSpecController')
  // Route.get('/:client', 'WhitelabelDocumentationUIController')
})
  .prefix('api/v1/documentation')
  .namespace('App/Modules/Documentation/Controllers')
