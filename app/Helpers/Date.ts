import { DateTime } from 'luxon'

export const DateTimeFormatQuick = function (
  date: Date = new Date(),
  format: string = 'yyyy-LL-dd hh:mm:ss'
): string {
  return DateTime.fromISO(date?.toString()).toFormat(format)
}

export const DateTimeBuilder = function (dateFormat: string, timeFormat: string = '00:00'): Date {
  const isoFormatted = [dateFormat, timeFormat].join(' ')
  return DateTime.fromFormat(isoFormatted, 'yyyy-LL-dd hh:mm:ss').toJSDate()
}

export const DateTimeNowISO = function (): string | null {
  return DateTime.now().toFormat('yyyy-LL-dd HH:mm:ss')
}

export const DateUTC = function (date?: Date) {
  return DateTime.utc()
}
