// 学校固有の休日（計画休日、振替休日など）
export const schoolSpecificHolidays: string[] = [
  '10-8', // 計画休日
  '10-14', // 運動会振替
  '11-10', // 音楽会振替
  // '2-10', // 計画休日
  // '4-28', // 計画休日
]

// 長期休暇期間の設定
export const vacationPeriods = {
  winter: {
    start: { month: 12, day: 25 },
    end: { month: 1, day: 7 },
  },
  spring: {
    start: { month: 3, day: 19 },
    end: { month: 4, day: 6 },
  },
  summer: {
    start: { month: 7, day: 23 },
    end: { month: 8, day: 20 },
  },
}
