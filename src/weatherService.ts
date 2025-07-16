import { getGeoInfo, getWeatherInfo } from "./api.js";
import { getWeatherDescription } from "./utils.js";
import { DailyForecast, GeoResult } from "./types.js";

export interface ProcessedWeather {
  cityName: string;
  current: {
    temperature: number;
    description: string;
  };
  weekly: {
    date: string;
    description: string;
    maxTemp: number;
    minTemp: number;
  }[];
}

export async function fetchAndProcessWeather(city: string): Promise<ProcessedWeather> {
  const geo = await getGeoInfo(city);
  const weatherData = await getWeatherInfo(geo.latitude, geo.longitude);

  const currentDescription = getWeatherDescription(weatherData.current_weather.weathercode);

  const weeklyForecast = weatherData.daily.time.map((date, index) => ({
    date: new Date(date).toLocaleDateString('ja-JP', { weekday: 'short' }),
    description: getWeatherDescription(weatherData.daily.weathercode[index]),
    maxTemp: weatherData.daily.temperature_2m_max[index],
    minTemp: weatherData.daily.temperature_2m_min[index],
  }));

  return {
    cityName: geo.name,
    current: {
      temperature: weatherData.current_weather.temperature,
      description: currentDescription,
    },
    weekly: weeklyForecast,
  };
}
