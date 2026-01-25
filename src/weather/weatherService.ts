import axios from 'axios'
import logger from '../logger'

export interface WeatherInfo {
  weather: string // 天気（晴れ、曇り、雨など）
  tempMin: number // 最低気温
  tempMax: number // 最高気温
}

// 富士見町の座標
const FUJIMI_LAT = 35.914
const FUJIMI_LON = 138.239

// Open-Meteo API URL
const OPEN_METEO_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${FUJIMI_LAT}&longitude=${FUJIMI_LON}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia/Tokyo`

// WMO天気コードを日本語に変換
const getWeatherFromWMOCode = (code: number): string => {
  const weatherMap: { [key: number]: string } = {
    0: '☀️快晴',
    1: '☀️晴れ',
    2: '⛅️晴れ時々曇り',
    3: '☁️曇り',
    45: '🌫霧',
    48: '🌫霧',
    51: '🌧小雨',
    53: '🌧小雨',
    55: '🌧雨',
    56: '🌧みぞれ',
    57: '🌧みぞれ',
    61: '🌧小雨',
    63: '🌧雨',
    65: '🌧大雨',
    66: '🌧みぞれ',
    67: '🌧みぞれ',
    71: '❄️小雪',
    73: '❄️雪',
    75: '❄️大雪',
    77: '❄️雪',
    80: '🌦にわか雨',
    81: '🌦にわか雨',
    82: '🌦激しいにわか雨',
    85: '❄️にわか雪',
    86: '❄️にわか雪',
    95: '⛈雷雨',
    96: '⛈雷雨',
    99: '⛈激しい雷雨',
  }
  return weatherMap[code] || '天気不明'
}

export const getWeather = async (
  date: Date
): Promise<WeatherInfo | null> => {
  try {
    const response = await axios.get(OPEN_METEO_API_URL)
    
    const daily = response.data.daily
    
    // 指定された日付に対応するインデックスを見つける
    const targetDateStr = date.toISOString().split('T')[0] // YYYY-MM-DD形式
    const dateIndex = daily.time.findIndex((d: string) => d === targetDateStr)
    
    // 該当する日付が見つからない場合は最初の日（今日）を使用
    const index = dateIndex >= 0 ? dateIndex : 0
    
    const weatherCode = daily.weather_code[index]
    const tempMin = Math.round(daily.temperature_2m_min[index] * 10) / 10
    const tempMax = Math.round(daily.temperature_2m_max[index] * 10) / 10

    return {
      weather: getWeatherFromWMOCode(weatherCode),
      tempMin: tempMin,
      tempMax: tempMax,
    }
  } catch (error) {
    logger.error({ err: error }, 'Failed to fetch weather from Open-Meteo')
    return null
  }
}
