export const getWeekNumber = (date: Date) => {
  // Первый день в году
  const firstDateOfYear = new Date(date.getFullYear(), 0, 1)
  // Сколько дней прошло
  const pastDaysYear = (date.getTime() - firstDateOfYear.getTime())/86400000

  return Math.ceil(pastDaysYear + firstDateOfYear.getDate() + 1)/7

}