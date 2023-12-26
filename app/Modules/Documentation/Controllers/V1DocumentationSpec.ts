import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import swaggerJSDoc from 'swagger-jsdoc'
import DocConfigGeneral from 'App/Modules/Documentation/Components/configs/smart-hr'
import DocConfigAdmin from 'App/Modules/Documentation/Components/configs/administration'

export default class V1DocumentationUIController {
  public async handle({ request }: HttpContextContract) {
    try {
      const ref = request.header('referer')
      if (ref && ref.indexOf('documentation/administration') > -1)
        return swaggerJSDoc(DocConfigAdmin)
      return swaggerJSDoc(DocConfigGeneral)
    } catch (err) {
      throw err
    }
  }
}
