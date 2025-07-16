export function getWeatherDescription(code: number): string {
    if (code === 0) return "晴れ ☀️";
    if (code >= 1 && code <= 3) return "曇り 🌥️";
    if (code === 45 || code === 48) return "霧 🌫️";
    if (code >= 51 && code <= 67) return "小雨 🌦️";
    if (code >= 71 && code <= 77) return "雪 ❄️";
    if (code >= 80 && code <= 82) return "にわか雨 🌧️";
    if (code >= 95) return "雷雨 ⛈️";
    return "不明";
  }
