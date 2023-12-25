import { DateTimeNowISO } from 'App/Helpers/Date'
import { UserActivitiesInterface } from 'App/Interfaces/MysqlModels'
import UserActivities from 'App/Models/Mysql/UserActivities'

export default class UserActivitiesService {
  public async createActivity(
    activityType: UserActivitiesInterface['type'],
    userCode: UserActivitiesInterface['userCode'],
    detail?: UserActivitiesInterface['detail']
  ) {
    await UserActivities.create({
      userCode,
      date: DateTimeNowISO(),
      type: activityType,
      detail,
    })
  }
}
