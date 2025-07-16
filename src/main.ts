import { renderWeatherResult, renderError, renderLoading } from "./dom.js";
import { fetchAndProcessWeather } from "./weatherService.js";

document.getElementById("searchButton")?.addEventListener("click", async () => {
  const input = document.getElementById("cityInput") as HTMLInputElement;
  const result = document.getElementById("weatherResult")!;
  const city = input.value.trim();

  if (!city) return alert("都市名を入力してください");

  renderLoading(result);

  try {
    const weather = await fetchAndProcessWeather(city);
    renderWeatherResult(result, weather);
  } catch (err) {
    const message = err instanceof Error ? err.message : "不明なエラーです";
    renderError(result, message);
    console.error(err);
  }
});
