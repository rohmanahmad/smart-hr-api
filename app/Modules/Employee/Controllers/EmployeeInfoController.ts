import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

type Activity = {
  date: DateTime
  type:
    | 'login'
    | 'register'
    | 'logout'
    | 'forgot-password'
    | 'change-profile-info'
    | 'change-password'
    | 'permit'
    | 'other'
  detail: {}
}

interface ReponseInterface {
  id: number
  properties: {
    page: {
      current: number
      total: number
      next: number | null
      prev: number | null
    }
  }
  activities: Array<Activity>
}

export default class UserAccountActivitiesController {
  public async handle({ request, response, auth }: HttpContextContract) {
    try {
      response.apiCollection({})
    } catch (err) {
      response.apiError(err)
    }
  }
}
