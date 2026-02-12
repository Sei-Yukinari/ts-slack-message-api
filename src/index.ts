import logger from './logger'
import { isHoliday } from './holidayUtils'
import { DateTime } from 'luxon'
import { createMessages } from './messages'
import { getWeather } from './weather/weatherService'
import { sendSlackMessages } from './slack/slackClient'
import { config } from './config/config.dev'

async function broadcastMessage(date: Date) {
  const weather = await getWeather(date)
  console.dir(weather)
  const messages = createMessages(date, weather)
  const slackWebhookUrl = config.slackWebhookUrl
  try {
    await sendSlackMessages(messages, slackWebhookUrl)
    logger.info('Done!')
  } catch (error) {
    logger.error({ err: error }, 'Error broadcasting message')
  }
}

// コマンドライン引数で日付指定（YYYY-MM-DD）、なければ明日
const argDate = process.argv[2]
const dt = argDate ? DateTime.fromISO(argDate, { zone: 'Asia/Tokyo' }) : DateTime.now().setZone('Asia/Tokyo').plus({ days: 1 });
const date: Date = dt.toJSDate();

(async () => {
  if (!isHoliday(date)) {
    await broadcastMessage(date)
  } else {
    logger.info('Today is holiday.')
  }
})()

