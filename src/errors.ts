export class SlackAPIError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = 'SlackAPIError';
  }
}

export class WeatherAPIError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = 'WeatherAPIError';
  }
}
