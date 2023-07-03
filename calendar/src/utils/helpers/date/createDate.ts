import { getWeekNumber } from "./getWeekNumber"

interface createDateParams {
  locale: string,
  date: Date,
}

export const createDate = (params?:createDateParams) => {
  const locale = params?.locale ?? 'default'

  const date = params?.date ?? new Date()
  const dayNumber = date.getDate()
  const day = date.toLocaleDateString(locale, { weekday: 'long'})
  const dayNumberInWeek = date.getDay() + 1
  const dayShort = date.toLocaleDateString(locale, {weekday: 'short'})

  const year = date.getFullYear()
  const yearShort = date.toLocaleDateString(locale, { year: '2-digit'})

  const month = date.toLocaleDateString(locale, {month: 'long'})
  const monthShort = date.toLocaleDateString(locale, {month: 'short'})
  const monthNumber = date.getMonth() + 1
  const monthIndex = date.getMonth()

  const timestamp = date.getTime()
  const weekNumber = getWeekNumber(date)

  return {

    date,
    dayNumber,
    day,
    dayNumberInWeek,
    dayShort,
    year,
    yearShort,
    month,
    monthShort,
    monthNumber,
    monthIndex,
    timestamp,
    weekNumber
  }
}

export default createDate


