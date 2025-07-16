export function renderWeatherResult(container: HTMLElement, cityName: string, temperature: number, description: string) {
    container.innerHTML = `
      <h2>${cityName}の天気</h2>
      <p>気温: ${temperature}°C</p>
      <p>${description}</p>
    `;
  }

  export function renderLoading(container: HTMLElement) {
    container.innerHTML = "<p>読み込み中...</p>";
  }

  export function renderError(container: HTMLElement) {
    container.innerHTML = "<p>エラーが発生しました。</p>";
  }
