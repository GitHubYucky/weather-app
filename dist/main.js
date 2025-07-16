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
import { getGeoInfo, getWeatherInfo } from "./api.js";
import { renderWeatherResult, renderError, renderLoading } from "./dom.js";
import { getWeatherDescription } from "./utils.js";
(_a = document.getElementById("searchButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const input = document.getElementById("cityInput");
    const result = document.getElementById("weatherResult");
    const city = input.value.trim();
    if (!city)
        return alert("都市名を入力してください");
    renderLoading(result);
    try {
        const geo = yield getGeoInfo(city);
        const weather = yield getWeatherInfo(geo.latitude, geo.longitude);
        const description = getWeatherDescription(weather.weathercode);
        renderWeatherResult(result, geo.name, weather.temperature, description);
    }
    catch (err) {
        renderError(result);
        console.error(err);
    }
}));
