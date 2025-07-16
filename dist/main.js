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
import { renderWeatherResult, renderError, renderLoading } from "./dom.js";
import { fetchAndProcessWeather } from "./weatherService.js";
(_a = document.getElementById("searchButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const input = document.getElementById("cityInput");
    const result = document.getElementById("weatherResult");
    const city = input.value.trim();
    if (!city)
        return alert("都市名を入力してください");
    renderLoading(result);
    try {
        const weather = yield fetchAndProcessWeather(city);
        renderWeatherResult(result, weather);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "不明なエラーです";
        renderError(result, message);
        console.error(err);
    }
}));
