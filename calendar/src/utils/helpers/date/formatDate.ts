import { createDate } from "."

export const formatDate = (date: Date, format: string) => {
  const d = createDate({ date })

  return format
    .replace(/\bYYYY\b/, d.year.toString())
    .replace(/\MM\b/, d.monthNumber.toString().padStart(2, '0'))
    .replace(/\DD\b/, d.dayNumber.toString().padStart(2, '0'))
}
