import * as dotenv from 'dotenv'
import logger from './logger'
import { isHoliday } from './holidayUtils'
import { createMessages } from './messages'
import { sendSlackMessages } from './slack/slackClient'
import { getWeather } from './weather/weatherService'

dotenv.config()

// Slack Webhook URL
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL || ''

// メッセージを送信
const broadcastMessage = async (date: Date) => {
  // 天気情報を取得（失敗してもメッセージ送信は継続）
  const weather = await getWeather(date)

  const messages = createMessages(date, weather)
  await sendSlackMessages(messages, slackWebhookUrl)
}

const today = new Date()
today.setDate(today.getDate() + 1) // 前日に送るので+1
today.setHours(today.getHours() + 9) // JSTに変換
logger.info(today.toISOString())
// 休みならメッセージを送信しない
if (!isHoliday(today)) {
  broadcastMessage(today)
    .then(() => logger.info('Done!'))
    .catch((error) => logger.error({ err: error }, 'Error broadcasting message'))
} else {
  logger.info('Today is holiday.')
}
