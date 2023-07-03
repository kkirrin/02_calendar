import { createMonth } from './createMonth';
import { createDate } from "./createDate"

interface createYearParams {
  locale?: string,
  monthNumber?: number,
  year?:number,
}

export const createYear = (params?:createYearParams) => {
  const locale = params?.locale ?? 'default'
  
  const monthCount = 12
  const today = createDate()

  const year = params?.year ?? today.year
  const monthNumber = params?.monthNumber ?? today.monthNumber

  const month = createMonth({ date: new Date(year, monthNumber - 1), locale})

  const getMonthDays = (monthIndex: number) => 
    createMonth({ date: new Date(year, monthIndex), locale}).createMonthDays()
  

  const createYearMonthes = () => {
    const monthes = []

    for( let i = 0; i<= monthCount - 1 ; i++ ) {
      monthes[i] = getMonthDays(i)
    } return monthes
  }

  return {
    createYearMonthes,
    year,
    month, 
  
  }
}