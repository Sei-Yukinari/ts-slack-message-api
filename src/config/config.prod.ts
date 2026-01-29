import { requireEnv } from './config';

export const config = {
  slackWebhookUrl: requireEnv('SLACK_WEBHOOK_URL'),
  openWeatherMapApiKey: requireEnv('OPENWEATHERMAP_API_KEY'),
  env: 'production',
};
