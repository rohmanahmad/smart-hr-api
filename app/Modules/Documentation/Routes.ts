import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/smart-hr', 'V1DocumentationUI')
  Route.get('/administration', 'V1DocumentationUI')
  Route.get('/spec.json', 'V1DocumentationSpec')
  Route.get('/assets/:file', 'DocumentationUIAssets')
  // Route.get('/specs/:client', 'WhitelabelDocumentationSpec')
  // Route.get('/:client', 'WhitelabelDocumentationUI')
})
  .prefix('api/v1/documentation')
  .namespace('App/Modules/Documentation/Controllers')
