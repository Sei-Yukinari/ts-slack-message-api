import axios from 'axios'
import logger from '../logger'
import { WeatherAPIError } from '../errors'
import { fromDate } from '../dates'

export interface WeatherInfo {
  weather: string // 天気（晴れ、曇り、雨など）
  temp: number // 気温
}

// 富士見町の座標
const FUJIMI_LAT = 35.9341
const FUJIMI_LON = 138.2930
import { config } from '../config/config.dev'

export const getWeather = async (date: Date): Promise<WeatherInfo | null> => {
  try {
    const dt = fromDate(date)
    const targetDateStr = dt.toISODate() // YYYY-MM-DD
    const apiKey = config.openWeatherMapApiKey
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${FUJIMI_LAT}&lon=${FUJIMI_LON}&units=metric&lang=ja&appid=${apiKey}`
    const response = await axios.get(url)
    const list = response.data.list
    // 指定日付06:00のデータを抽出
    const target = list.find((item: any) => item.dt_txt === `${targetDateStr} 06:00:00`)
    if (!target) {
      logger.error({ date: targetDateStr }, 'No 06:00 weather data for this date')
      return null
    }
    console.dir(target)
    const temp = Math.round(target.main.temp * 10) / 10
    const weather = target.weather[0].description
    console.log(weather, temp)
    return {
      weather,
      temp,
    }
  } catch (error: unknown) {
    logger.error({ err: error }, 'Failed to fetch weather from OpenWeatherMap')
    throw new WeatherAPIError('Failed to fetch weather from OpenWeatherMap', error)
  }
}

