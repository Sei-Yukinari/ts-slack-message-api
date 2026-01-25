import { isHoliday } from './holidayUtils'

describe('isHoliday', () => {
  it('returns true for a known holiday from holiday_jp', () => {
    const date = new Date('2024-01-01')
    expect(isHoliday(date)).toBe(true)
  })

  it('returns true for a date within winter break', () => {
    const date = new Date('2024-01-05')
    expect(isHoliday(date)).toBe(true)
  })

  it('returns true for a date within spring break', () => {
    const date = new Date('2024-03-20')
    expect(isHoliday(date)).toBe(true)
  })

  it('returns true for a date within summer break', () => {
    const date = new Date('2024-08-10')
    expect(isHoliday(date)).toBe(true)
  })

  it('returns false for a date that is not a holiday', () => {
    const date = new Date('2024-02-15')
    expect(isHoliday(date)).toBe(false)
  })

  it('returns false for a date just before winter break', () => {
    const date = new Date('2024-12-25')
    expect(isHoliday(date)).toBe(true)
  })

  it('returns false for a date just after winter break', () => {
    const date = new Date('2025-01-08')
    expect(isHoliday(date)).toBe(false)
  })

  it('returns false for a date just before spring break', () => {
    const date = new Date('2024-03-14')
    expect(isHoliday(date)).toBe(false)
  })

  it('returns false for a date just after spring break', () => {
    const date = new Date('2024-04-07')
    expect(isHoliday(date)).toBe(false)
  })

  it('returns false for a date just before summer break', () => {
    const date = new Date('2024-07-23')
    expect(isHoliday(date)).toBe(true)
  })

  it('returns false for a date just after summer break', () => {
    const date = new Date('2024-08-20')
    expect(isHoliday(date)).toBe(true)
  })

  it('returns true for a school-specific holiday', () => {
    const date = new Date('2025-10-08')
    expect(isHoliday(date)).toBe(true)
  })
  it('returns true substitute day for the sports festival', () => {
    const date = new Date('2025-10-14')
    expect(isHoliday(date)).toBe(true)
  })
  it('returns true substitute day for the music festival', () => {
    const date = new Date('2025-11-10')
    expect(isHoliday(date)).toBe(true)
  })
})
