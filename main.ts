function getWeatherDescription(code: number): string {
    if (code === 0) return "晴れ ☀️";
    if (code >= 1 && code <= 3) return "曇り 🌥️";
    if (code === 45 || code === 48) return "霧 🌫️";
    if (code >= 51 && code <= 67) return "小雨 🌦️";
    if (code >= 71 && code <= 77) return "雪 ❄️";
    if (code >= 80 && code <= 82) return "にわか雨 🌧️";
    if (code >= 95) return "雷雨 ⛈️";
    return "不明";
  }

  async function getWeather(): Promise<void> {
    const cityInput = document.getElementById("cityInput") as HTMLInputElement;
    const result = document.getElementById("weatherResult")!;
    const city = cityInput.value.trim();

    if (!city) {
      alert("都市名を入力してください");
      return;
    }

    result.innerHTML = "天気を取得中...";

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
      );
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        result.innerHTML = "都市が見つかりませんでした。";
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();
      const weather = weatherData.current_weather;
      const description = getWeatherDescription(weather.weathercode);

      result.innerHTML = `
        <p><strong>${name}</strong> の現在の天気</p>
        <p>気温：${weather.temperature}℃</p>
        <p>天気：${description}</p>
      `;
    } catch (error) {
      result.innerHTML = "天気情報の取得に失敗しました。";
      console.error(error);
    }
  }

  document.getElementById("searchButton")?.addEventListener("click", getWeather);
