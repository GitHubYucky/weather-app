import { getGeoInfo, getWeatherInfo } from "./api.js";
import { renderWeatherResult, renderError, renderLoading } from "./dom.js";
import { getWeatherDescription } from "./utils.js";

document.getElementById("searchButton")?.addEventListener("click", async () => {
  const input = document.getElementById("cityInput") as HTMLInputElement;
  const result = document.getElementById("weatherResult")!;
  const city = input.value.trim();

  if (!city) return alert("都市名を入力してください");

  renderLoading(result);

  try {
    const geo = await getGeoInfo(city);
    const weather = await getWeatherInfo(geo.latitude, geo.longitude);
    const description = getWeatherDescription(weather.weathercode);
    renderWeatherResult(result, geo.name, weather.temperature, description);
  } catch (err) {
    renderError(result);
    console.error(err);
  }
});
