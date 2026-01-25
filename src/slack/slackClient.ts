import axios from 'axios'
import { SlackMessage } from '../messages'
import logger from '../logger'
import { SlackAPIError } from '../errors'
import { retry } from './retry'

export const sendSlackMessages = async (
  messages: SlackMessage[],
  webhookUrl: string,
): Promise<void> => {
  for (const message of messages) {
    try {
      await retry(() => axios.post(webhookUrl, message), 3, 1000, 2)
      logger.info({ message }, 'Slack message sent')
    } catch (error: unknown) {
      logger.error({ err: error, message }, 'Failed to send Slack message')
      throw new SlackAPIError('Failed to send Slack message', error)
    }
  }
}
