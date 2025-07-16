export function renderWeatherResult(container, cityName, temperature, description) {
    container.innerHTML = `
      <h2>${cityName}の天気</h2>
      <p>気温: ${temperature}°C</p>
      <p>${description}</p>
    `;
}
export function renderLoading(container) {
    container.innerHTML = "<p>読み込み中...</p>";
}
export function renderError(container) {
    container.innerHTML = "<p>エラーが発生しました。</p>";
}
