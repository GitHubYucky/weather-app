var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getGeoInfo, getWeatherInfo } from "./api.js";
import { getWeatherDescription } from "./utils.js";
export function fetchAndProcessWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const geo = yield getGeoInfo(city);
        const weatherData = yield getWeatherInfo(geo.latitude, geo.longitude);
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
    });
}
