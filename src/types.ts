// src/types.ts
// resData
export interface GeoResult {
    latitude: number;
    longitude: number;
    name: string;
  }
//resData配列
  export interface GeoResponse {
    results?: GeoResult[];
  }
//


  //ResponseOfweatherInfo
  // ex.
  /*
  {
    "current_weather": {
      "temperature": 25.0,
      "weathercode": 3
    }
  }
  */
  export interface WeatherResponse {
    current_weather: CurrentWeather;
    daily: DailyForecast;
  }

  export interface CurrentWeather {
    temperature: number;
    weathercode: number;
  }

  export interface DailyForecast {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  }
