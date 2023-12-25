import crypto from 'crypto'
import { TasksEmailSenderInterface } from 'App/Interfaces/MysqlModels'
import TaskEmailSenderModel from 'App/Models/Mysql/TasksEmailSender'

export default class TaskService {
  public async createNewTask(item: TasksEmailSenderInterface): Promise<void> {
    item.uuid = this.getUUID()
    await TaskEmailSenderModel.create(item)
  }

  private getUUID(): string {
    return crypto.randomUUID()
  }
}
