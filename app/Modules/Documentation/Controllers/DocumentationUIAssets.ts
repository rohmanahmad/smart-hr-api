import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import path from 'path'

export default class DocumentationUIController {
  public async handle({ request, response }: HttpContextContract) {
    try {
      const filename = request.param('file')
      const fullpath = path.resolve('app/Modules/Documentation/Components/assets', filename)
      response.download(fullpath)
    } catch (err) {
      throw err
    }
  }
}
