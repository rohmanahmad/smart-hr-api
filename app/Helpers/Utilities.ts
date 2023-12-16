import { DateTime } from 'luxon'
import Config from '@ioc:Adonis/Core/Config'
const channelItems = Config.get('streams.channel_items', [])
import { ServiceCategories } from 'App/Interfaces/Channels'
import { ServiceObject } from 'App/Interfaces'

export const ProjectSplitter = function (project: string): Array<number> {
  return project
    .split(',')
    .map((x) => parseInt(x))
    .filter((x) => x > 0)
}

export const DateTimeBuilder = function (dateFormat: string, timeFormat: string = '00:00'): Date {
  const isoFormatted = [dateFormat, timeFormat].join(' ')
  return DateTime.fromFormat(isoFormatted, 'yyyy-LL-dd hh:mm:ss').toJSDate()
}

export const StringToArrayInt = function (str: string, delimiter: string = ','): Array<number> {
  return str
    .split(delimiter)
    .map((x) => parseInt(x))
    .filter((x) => x > 0)
}

export const StringToArrayString = function (str: string, delimiter: string = ','): Array<string> {
  return str
    .split(delimiter)
    .map((x) => x.trim())
    .filter((x) => x.length > 0)
}

export const MapServiceCategory = function (
  serviceIds: Array<number>,
  socialMediaOnly?: Array<string>
): ServiceCategories[] {
  let ch: Array<ServiceCategories> = channelItems
    .filter((x: ServiceObject) => serviceIds.indexOf(x.id) > -1)
    .map((x: ServiceObject) => x.items)
    .reduce((r: Array<string>, x: Array<string>) => {
      r = r.concat(x)
      return r
    }, [])
  if (socialMediaOnly) ch = ch.filter((x: string) => socialMediaOnly.indexOf(x) > 0)
  return ch
}

export const timezone = 7 * 60 * 60 * 1000
