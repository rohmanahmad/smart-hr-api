import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from 'fs'
const faviconEncode = Buffer.from(
  fs.readFileSync(__dirname + '/../Components/icons/swagger_favicon.png')
).toString('base64')

export default class V1DocumentationUIController {
  public async handle({ view }: HttpContextContract) {
    try {
      const html = await view.render('documentation::documentation', {
        favicon: 'data:image/png;base64,' + faviconEncode,
        specUrl: '/api/v3/documentation/r10.json',
      })
      return html
    } catch (err) {
      throw err
    }
  }
}
