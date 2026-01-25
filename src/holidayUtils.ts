import holiday_jp from '@holiday-jp/holiday_jp'
import { schoolSpecificHolidays, vacationPeriods } from './config/holidays'

export const isHoliday = (date: Date): boolean => {
  if (holiday_jp.isHoliday(date)) return true

  const month = date.getMonth() + 1
  const day = date.getDate()

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
