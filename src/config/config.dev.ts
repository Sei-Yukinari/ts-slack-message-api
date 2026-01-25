import { requireEnv } from './config';

export const config = {
  slackWebhookUrl: requireEnv('SLACK_WEBHOOK_URL'),
  env: 'development',
};
