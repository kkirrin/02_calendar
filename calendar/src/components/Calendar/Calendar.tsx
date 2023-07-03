import React from 'react'
import { useCalendar } from "./hooks/useCalendar"
import './Calendar.css'
import { checkDateIsEqual, checkIsToday, getWeekDaysNames } from '../../utils/helpers/date'

interface CalendarProps {
  locale?: string,
  selectedDate: Date,
  selectDate: (date: Date) => void,
  firstWeekDay?: number
}

export const Calendar: React.FC<CalendarProps> = ({
  // Понедельник
  firstWeekDay = 2,
  locale = 'en-US', 
  selectDate,
  selectedDate,


}) => {

    const {state, functions} = useCalendar({ firstWeekDay, locale, selectedDate })
    console.log('state', state)
    return <div className='calendar'>
      <div className='calendar_header'>
        <div 
          aria-hidden 
          onClick={(() => functions.onClickArrow('left'))} 
          className='calendar_header_arrow_left'
        />
          {state.mode === 'days' && (
            <div aria-hidden onClick={() => functions.setMode('monthes')}>
              {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
            </div>
          )}
          {state.mode === 'monthes' && (
            <div aria-hidden onClick={() => functions.setMode('years')}>
               {state.selectedYear}
            </div>
          )}
          {state.mode === 'years' && (
            <div aria-hidden >
              {state.selectedYearRange[0]} - {''}
              {state.selectedYearRange[state.selectedYearRange.length - 1]}
            </div>
          )}
        <div 
          aria-hidden 
          className='calendar_header_arrow_right' 
          onClick={(() => functions.onClickArrow('right'))}
        />
      </div>
      <div className='calendar_body'>
            {state.mode === 'days' && (
              <>
                <div className='calendar_week_names' >
                    {state.weekDaysNames.map((weekDaysNames) => (
                      <div key={weekDaysNames.dayShort}>
                        {weekDaysNames.dayShort}
                      </div> 
                    ))}
                </div>
                
                <div className='calendar_days'>
                      {state.calendarDays.map((day) => {
                      const isToday = checkIsToday(day.date);
                      const isSelectedDay = checkDateIsEqual(day.date, state.selectedDate.date);
                      const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
                        
                      return (

                        <div aria-hidden key={`${day.dayNumber} - ${day.monthIndex}`}
                        onClick={() => {
                          functions.setSelectedDate(day)
                          selectDate(day.date)}}
                        className={[
                          'calendar_day', 
                          isToday ? 'calendar_today_item' : '',
                          isSelectedDay ? 'calendar_selected_item' : '',
                          isAdditionalDay ? 'calendar_additional_item' : '',
                        ].join(' ')}>
                          {day.dayNumber}
                        </div>
                        )
                      })}
                    
                </div>
              </>
            )}
              {state.mode === 'monthes' && (
                  <div className='calendar_pick_item_container'>
                    {state.monthesNames.map(name => {
                      const isCurrentMonth = 
                      new Date().getMonth() === name.monthIndex && 
                      new Date().getFullYear() === state.selectedYear 
                      const isSelectedMonth = name.monthIndex === state.selectedMonth.monthIndex
                          
                       return <div 
                       onClick={() => {
                          functions.setSelectedMonthByIndex(name.monthIndex)
                          functions.setMode('days')
                       }}
                       className={[
                        'calendar_pick_item',
                        isCurrentMonth ? 'calendar_today_item' : '',
                        isSelectedMonth ? 'calendar_selected_item' : '',
                        ].join(' ')}>
                          {name.monthShort}
                        </div>
                    })}
                  </div>
                )} 
              {state.mode === 'years' && (
                
              <div className='calendar_pick_item_container'>
                <div className='calendar_unchoosable_year'>{state.selectedYearRange[0] - 1}</div>
                {state.selectedYearRange.map(year => {
                  const isSelectedYear = year === state.selectedYear
                  const isCurrentYear  = new Date().getFullYear() === year
                      
                  return <div 
                  onClick={() => {
                      functions.setSelectedYear(year)
                      functions.setMode('monthes')
                  }}
                  className={[
                    'calendar_pick_item',
                    isCurrentYear ? 'calendar_today_item' : '',
                    isSelectedYear ? 'calendar_selected_item' : '',
                    ].join(' ')}>
                      {year}
                    </div>
              })}
            </div>
              )}
              <div className='calendar_unchoosable_year'> {state.selectedYearRange[state.selectedYearRange.length - 1] + 1}</div>
      </div>
    </div>

}