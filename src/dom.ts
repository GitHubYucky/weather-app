import { ProcessedWeather } from "./weatherService.js";

export function renderWeatherResult(container: HTMLElement, weather: ProcessedWeather) {
    container.innerHTML = `
      <h2>${weather.cityName}の天気</h2>
      <p>気温: ${weather.current.temperature}°C</p>
      <p>${weather.current.description}</p>
      <h3>週間天気予報</h3>
      <div class="weekly-forecast">
        ${weather.weekly.map(day => `
          <div class="day-forecast">
            <p>${day.date}</p>
            <p>${day.description}</p>
            <p>最高: ${day.maxTemp}°C</p>
            <p>最低: ${day.minTemp}°C</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  export function renderLoading(container: HTMLElement) {
    container.innerHTML = "<p>読み込み中...</p>";
  }

  export function renderError(container: HTMLElement, message: string = "エラーが発生しました。") {
    container.innerHTML = `<p>${message}</p>
`;
  }
