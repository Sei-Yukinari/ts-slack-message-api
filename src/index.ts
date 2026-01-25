import logger from './logger'
import { isHoliday } from './holidayUtils'
import { DateTime } from 'luxon'

// Luxonで翌日JSTを生成
const today = DateTime.utc().plus({ days: 1 }).setZone('Asia/Tokyo')
logger.info(today.toISO())
// LuxonのDateTime→Dateへ変換
const todayDate = today.toJSDate()
// 休みならメッセージを送信しない
if (!isHoliday(todayDate)) {
  // broadcastMessage(todayDate)
  //   .then(() => logger.info('Done!'))
  //   .catch((error) =>
  //     logger.error({ err: error }, 'Error broadcasting message'),
  //   )
} else {
  logger.info('Today is holiday.')
}
