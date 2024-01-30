/* 
POST /api/v1/presence/generate
body:
- type
    - clock-in
    - clock-out
- date (YYYY-MM-DD)
- time (HH:mm:ss)
*/

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PresenceController {
  public async handle({ request, response }: HttpContextContract) {
    try {
      const { type, date, time, coordinate } = request.body()
      const data = await this.createPresence({ type, date, time, coordinate })
      response.apiSuccess({})
    } catch (err) {
      response.apiError(err)
    }
  }

  private async
}
