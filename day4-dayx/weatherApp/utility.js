// Mappings for weather codes

export const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Light rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Light snowfall",
  73: "Moderate snowfall",
  75: "Heavy snowfall",
  77: "Snow grains",
  80: "Light rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Light snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm slight hail",
  99: "Thunderstorm heavy hail",
};

// Wind Direction Conversion (Degrees → Cardinal Direction)

export const directions = [
  "North",
  "Northeast",
  "East",
  "Southeast",
  "South",
  "Southwest",
  "West",
  "Northwest",
];

// Convert wind degree to direction string

export function degToDirection(deg) {
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

// Get the appropriate text content for 'feels like' widget
export function getFeelsLikeText(actual, feelsLike) {
  const diff = feelsLike - actual;

  if (diff >= 4) {
    return "Feels much warmer than the actual temperature.";
  } else if (diff >= 2) {
    return "Feels a bit warmer than it really is.";
  } else if (diff <= -4) {
    return "Feels noticeably cooler than reported.";
  } else if (diff <= -2) {
    return "Slightly cooler than the temperature suggests.";
  } else {
    return "Feels about the same as reported.";
  }
}

// Get the appropriate text content for 'visibility' widget

export function getVisibilityText(km) {
  if (km >= 10) return "Visibility is excellent — great for outdoor plans.";
  if (km >= 5) return "Visibility is decent, but some haze is possible.";
  if (km >= 2) return "Visibility is reduced — caution advised.";
  return "Visibility is poor — avoid travel if possible.";
}

// Get the appropriate text content for 'humidity' widget

export function getHumidityText(humidity) {
  if (humidity <= 30) return "Air is dry — stay hydrated and moisturized.";
  if (humidity <= 60) return "Humidity is comfortable and pleasant.";
  if (humidity <= 80) return "Feels a bit sticky or muggy at times.";
  return "Very humid — may feel warmer and sticky.";
}

// Get the appropriate text content for 'precipitation' widget

export function getPrecipitationText(probability) {
  if (probability === 0) {
    return "No rain expected — skies look clear.";
  } else if (probability > 0 && probability <= 30) {
    return "Low chance of rain — likely to stay dry.";
  } else if (probability > 30 && probability <= 60) {
    return "Moderate chance of rain — umbrella might help.";
  } else if (probability > 60 && probability <= 90) {
    return "Rain likely — plan for wet conditions.";
  } else {
    return "Very likely to rain — grab your rain gear!";
  }
}

// Convert UV index to category and advice

export function uvIndexToLevel(uv) {
  if (uv <= 2) {
    return "Low – You're good to go! Minimal protection needed.";
  }
  if (uv <= 5) {
    return "Moderate – Stay in shade near midday and wear sunglasses & sunscreen.";
  }
  if (uv <= 7) {
    return "High – Use SPF 30+ sunscreen, wear protective clothing, and seek shade.";
  }
  if (uv <= 10) {
    return "Very High – Avoid sun during midday hours. Use SPF 30+, wear a hat and sunglasses.";
  }
  return "Extreme – Try to stay indoors, wear full coverage, and reapply strong SPF often.";
}
