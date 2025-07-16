// src/types.ts
export interface GeoResult {
    latitude: number;
    longitude: number;
    name: string;
  }

  export interface GeoResponse {
    results?: GeoResult[];
  }

  export interface CurrentWeather {
    temperature: number;
    weathercode: number;
  }

  export interface WeatherResponse {
    current_weather: CurrentWeather;
  }
