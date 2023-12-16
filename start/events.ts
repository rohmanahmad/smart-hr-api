/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event'
import DiscordService from 'App/Services/Discord'

Event.on('user:login', (data) => {
  const DC = new DiscordService('webhook:r10:login')
  for (const key in data) {
    DC.setField(key, data[key])
  }
  DC.send()
})
