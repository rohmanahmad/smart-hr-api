import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/generate', 'CreatePresence')
  Route.post('/aprove', 'Approval')
})
  .prefix('api/v1/presence')
  .namespace('App/Modules/Presences/Controllers')
