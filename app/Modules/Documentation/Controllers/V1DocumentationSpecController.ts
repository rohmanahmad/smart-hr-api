import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import swaggerJSDoc from 'swagger-jsdoc'
import DocConfig from 'App/Modules/Documentation/Components/configs/v1'

export default class V1DocumentationUIController {
  public async handle({}: HttpContextContract) {
    try {
      return swaggerJSDoc(DocConfig)
    } catch (err) {
      throw err
    }
  }
}
