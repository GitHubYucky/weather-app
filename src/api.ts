// src/api.ts
import { GeoResponse, WeatherResponse } from "./types.js";

export async function getGeoInfo(city: string) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
  );
  const data: GeoResponse = await res.json();
  if (!data.results || data.results.length === 0) throw new Error("都市が見つかりません");
  return data.results[0];
}

export async function getWeatherInfo(lat: number, lon: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
  );
  const data: WeatherResponse = await res.json();
  return data;
}
