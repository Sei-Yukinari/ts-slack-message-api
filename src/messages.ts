export interface SlackMessage {
  text?: string
  attachments?: Array<{
    color?: string
    text: string
  }>
}

export interface WeatherInfo {
  weather: string
  temp: number
}

import logger from './logger'
import { fromDate } from './dates'

export const createMessages = (
  date: Date,
  weather?: WeatherInfo | null,
): SlackMessage[] => {
  // date を Luxon DateTime に変換して操作
  const dt = fromDate(date)

  let dateString: string
  try {
    dateString = dt.setLocale('ja').toFormat("d(EEE)")
  } catch (error) {
    logger.error({ err: error, date }, 'Failed to format date')
    dateString = date.toISOString()
  }
  const isWednesday = dt.weekday === 3

  const messages: SlackMessage[] = []

  // <!channel>を一番上に配置
  let headerText = `<!channel>\n${dateString} *------登校------*`
  if (weather) {
    headerText += `\n${weather.weather} 🌡${weather.temp}℃（06:00時点）`
  }

  messages.push({ text: headerText })
  messages.push({ attachments: [{ color: '#e01e5a', text: '「車」' }] }) // 赤
  messages.push({ attachments: [{ color: '#2eb886', text: '「歩き」' }] }) // 青
  messages.push({ text: '*------------下校------------*' })
  messages.push({ attachments: [{ color: '#e01e5a', text: '「車」' }] }) // 赤
  messages.push({ attachments: [{ color: '#2eb886', text: '「歩き」' }] }) // 青
  messages.push({
    attachments: [{ color: '#2e4ab8', text: '「歩き(フジ精機)」' }],
  }) // 青

  if (isWednesday) {
    messages.push({ attachments: [{ color: '#a63693', text: 'ひこうせん✈' }] }) // 紫
  }

  messages.push({ attachments: [{ color: '#e8e851', text: '*「休み」*' }] }) // 黄色

  return messages
}
