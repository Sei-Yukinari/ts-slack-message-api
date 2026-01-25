import axios from 'axios'
import { SlackMessage } from '../messages'

export const sendSlackMessages = async (
  messages: SlackMessage[],
  webhookUrl: string
): Promise<void> => {
  for (const message of messages) {
    await axios.post(webhookUrl, message)
  }
}
