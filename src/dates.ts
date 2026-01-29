import { DateTime } from 'luxon'

export const toDate = (dt: DateTime): Date => dt.toJSDate()

export const fromDate = (d: Date): DateTime => DateTime.fromJSDate(d).setZone('Asia/Tokyo')

export const getMonth = (d: DateTime): number => d.month // Luxon month is 1-based; keep 1-based to match config/holidays.month
export const getDay = (d: DateTime): number => d.day

export const addDays = (d: DateTime, days: number): DateTime => d.plus({ days })
