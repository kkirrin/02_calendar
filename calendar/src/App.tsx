import React from 'react'
import './static/style/main.css'
import {Calendar} from './components/Calendar/Calendar'
import { formatDate } from './utils/helpers/date'


export const App: React.FC = () => {  

  const [selectedDate, selectDate] = React.useState(new Date())
  return (
    <div className='app_container'>
      <div className='date_container'>{formatDate(selectedDate, 'DD MM YYYY')} </div>
      <Calendar selectDate={selectDate} selectedDate={selectedDate} />
    </div>
  )
}

export default App
