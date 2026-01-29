import holiday_jp from '@holiday-jp/holiday_jp'
import { schoolSpecificHolidays, vacationPeriods } from './config/holidays'
import { getMonth, getDay, fromDate } from './dates'

export const isHoliday = (date: Date): boolean => {
  const dt = fromDate(date)

  if (holiday_jp.isHoliday(date)) return true

  const month = getMonth(dt)
  const day = getDay(dt)

  if (schoolSpecificHolidays.includes(`${month}-${day}`)) return true

  return (
    (month === vacationPeriods.winter.start.month &&
      day >= vacationPeriods.winter.start.day) ||
    (month === vacationPeriods.winter.end.month &&
      day <= vacationPeriods.winter.end.day) ||
    (month === vacationPeriods.spring.start.month &&
      day >= vacationPeriods.spring.start.day) ||
    (month === vacationPeriods.spring.end.month &&
      day <= vacationPeriods.spring.end.day) ||
    (month === vacationPeriods.summer.start.month &&
      day >= vacationPeriods.summer.start.day) ||
    (month === vacationPeriods.summer.end.month &&
      day <= vacationPeriods.summer.end.day)
  )
}
