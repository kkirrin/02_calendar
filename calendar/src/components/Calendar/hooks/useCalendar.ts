
import  React  from 'react';
import {  createMonth, createDate,getMonthNames, getWeekDaysNames, getMonthNumberOfDays } from '../../../utils/helpers/date/';

interface UseCalendarParams {
  locale?: string,
  selectedDate: Date, 
  firstWeekDay: number
}

const  getYearRange = (year: number) => {
  const startYear = Math.floor(year / 10) * 10
  return [...Array(10)].map((_, i) => startYear + i)
}

export const useCalendar = ({firstWeekDay = 2,  locale = 'default', selectedDate: date }: UseCalendarParams) => {
  const [mode, setMode] = React.useState<'days' | 'monthes' | 'years'>('days')
  const [selectedDate, setSelectedDate] = React.useState(createDate({ date }))
  const [selectedMonth, setSelectedMonth] = React.useState(createMonth({ date: new Date(selectedDate.year, selectedDate.monthIndex), locale }))

  const [selectedYear, setSelectedYear] = React.useState(selectedDate.year)
  const [selectedYearRange, setSelectedYearRange] = React.useState(getYearRange(selectedDate.year))

  const monthesNames = React.useMemo(() => getMonthNames(locale), [])
  // 1 воскресенье
  // 2 понедельник

  const weekDaysNames = React.useMemo(() => getWeekDaysNames(firstWeekDay, locale), [])
  console.log('weekDays', weekDaysNames)

  const days = React.useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear])



  const calendarDays = React.useMemo(() => {
    const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear)
    // Число дней в месяце
    console.log('monthNumberOfDays',monthNumberOfDays )

    // Чтобы отобразить предыдущие дни в календаре
    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale
    }).createMonthDays()
    // Чтобы отобразить следующие дни за этим месяцем
    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale
    }).createMonthDays()

    const firstDay = days[0]
    const lastDay = days[monthNumberOfDays - 1]

    // Сдвиг
    const shiftIndex = firstWeekDay - 1

    // Количество дней которое нужно отобразить перед месяцом
    const numberOfPrevDays = firstDay.dayNumberInWeek - 1 - shiftIndex < 0 
      ? 7 - (firstWeekDay - firstDay.dayNumberInWeek)
      : firstDay.dayNumberInWeek - 1 - shiftIndex
    console.log('number of prev days:', numberOfPrevDays)

    // Количество дней которое нужно отобразить после месяца
    const numberOfNextDays = 7 - lastDay.dayNumberInWeek + shiftIndex < 6 
      ? 7 - lastDay.dayNumberInWeek -  7 - shiftIndex
      : 7 - lastDay.dayNumberInWeek +  shiftIndex
    console.log('number of next days:', numberOfNextDays)

    // Всего дней в календаре
    const totalCalendarDays = days.length + numberOfNextDays + numberOfPrevDays

    const result = []

    for( let i = 0; i < numberOfPrevDays; i++){
      const inverted = numberOfPrevDays - i
      result[i] = prevMonthDays[prevMonthDays.length - inverted]
    }
    for( let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i++){
      
      result[i] = days[i - numberOfPrevDays]
    }
    for( let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i++){

      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays]
    }

    return result

  }, [selectedMonth.createMonthDays, selectedMonth.monthIndex, selectedYear])

  console.log(calendarDays)

  // Вывести все дни в месяце
  console.log('days', days)

  const onClickArrow = (direction: 'right' | 'left' ) => {
    
    if(mode === 'years' && direction === 'left' ) {
        return setSelectedYearRange(getYearRange(selectedYearRange[0] - 10))
    }
    if(mode === 'years' && direction === 'right' ) {
      return setSelectedYearRange(getYearRange(selectedYearRange[0] + 10))
    }

    if(mode === 'monthes' && direction === 'left' ) {
      const year = selectedYear - 1
      if(!selectedYearRange.includes(year)) setSelectedYearRange(getYearRange(year))
        return setSelectedYear(year)
    }
    if(mode === 'monthes' && direction === 'right' ) {
      const year = selectedYear + 1
      if(!selectedYearRange.includes(year)) setSelectedYearRange(getYearRange(year))
        return setSelectedYear(year)
    }


    if(mode === 'days') {
      const monthIndex = direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1
    
      if(monthIndex === -1 ) {
          const year = selectedYear - 1
          setSelectedYear(year)
          if(!selectedYearRange.includes(year)) setSelectedYearRange(getYearRange(year))
            return setSelectedMonth(createMonth({date: new Date(year, 11), locale}))
      }

      if(monthIndex === 12 ) {
          const year = selectedYear +  1
          setSelectedYear(year)
          if(!selectedYearRange.includes(year)) setSelectedYearRange(getYearRange(year))
            return setSelectedMonth(createMonth({date: new Date(year, 0), locale}))
      }
      return setSelectedMonth(createMonth({date: new Date(selectedYear, monthIndex), locale}))
  }

  }

  const setSelectedMonthByIndex = (monthIndex: number) => {
    setSelectedMonth(createMonth({date: new Date(selectedYear, monthIndex), locale}))
  }

  return {
    state: {
      mode,
      calendarDays, 
      weekDaysNames,
      monthesNames,
      selectedDate,
      selectedMonth,
      selectedYear,
      selectedYearRange
    },
    functions: {
      setMode,
      setSelectedDate,
      onClickArrow,
      setSelectedMonthByIndex,
      setSelectedYear
    }
  } 
}