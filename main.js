"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
function getWeatherDescription(code) {
    if (code === 0)
        return "晴れ ☀️";
    if (code >= 1 && code <= 3)
        return "曇り 🌥️";
    if (code === 45 || code === 48)
        return "霧 🌫️";
    if (code >= 51 && code <= 67)
        return "小雨 🌦️";
    if (code >= 71 && code <= 77)
        return "雪 ❄️";
    if (code >= 80 && code <= 82)
        return "にわか雨 🌧️";
    if (code >= 95)
        return "雷雨 ⛈️";
    return "不明";
}
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const cityInput = document.getElementById("cityInput");
        const result = document.getElementById("weatherResult");
        const city = cityInput.value.trim();
        if (!city) {
            alert("都市名を入力してください");
            return;
        }
        result.innerHTML = "天気を取得中...";
        try {
            const geoRes = yield fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`);
            const geoData = yield geoRes.json();
            if (!geoData.results || geoData.results.length === 0) {
                result.innerHTML = "都市が見つかりませんでした。";
                return;
            }
            const { latitude, longitude, name } = geoData.results[0];
            const weatherRes = yield fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            const weatherData = yield weatherRes.json();
            const weather = weatherData.current_weather;
            const description = getWeatherDescription(weather.weathercode);
            result.innerHTML = `
        <p><strong>${name}</strong> の現在の天気</p>
        <p>気温：${weather.temperature}℃</p>
        <p>天気：${description}</p>
      `;
        }
        catch (error) {
            result.innerHTML = "天気情報の取得に失敗しました。";
            console.error(error);
        }
    });
}
(_a = document.getElementById("searchButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", getWeather);
