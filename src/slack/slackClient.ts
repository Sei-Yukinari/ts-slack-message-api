import axios from 'axios'
import { SlackMessage } from '../messages'
import logger from '../logger'

export const sendSlackMessages = async (
  messages: SlackMessage[],
  webhookUrl: string
): Promise<void> => {
  for (const message of messages) {
    try {
      await axios.post(webhookUrl, message)
      logger.info({ message }, 'Slack message sent')
    } catch (error) {
      logger.error({ err: error, message }, 'Failed to send Slack message')
    }
  }
}
