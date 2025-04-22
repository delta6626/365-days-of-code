// =======================
// Top Bar Elements
// =======================
const searchBox = document.querySelector(".searchBox");
const searchButton = document.querySelector(".search");
const searchButtonText = document.querySelector(".searchButtonText");
const loaderIcon = document.querySelector(".loaderIcon");

// =======================
// Current Weather Section
// =======================
const place = document.querySelector(".place");
const temperature = document.querySelector(".temperature");
const weatherCode = document.querySelector(".weatherCode");

// =======================
// Widgets in Weather Today
// =======================
const feelsLikeTemperature = document.querySelector(".feelsLikeTemperature");
const precipitationValue = document.querySelector(".precipitationValue");
const visibility = document.querySelector(".visibilityValue");
const humidityValue = document.querySelector(".humidityValue");
const visibilityExtraText = document.querySelector(".visibilityExtraText");
const humidityExtraText = document.querySelector(".humidityExtraText");
const precipitationExtraText = document.querySelector(
  ".precipitationExtraText"
);
const feelsLikeExtraText = document.querySelector(".feelsLikeExtraText");

// =======================
// Hourly Forecast Elements
// =======================
const hourlyForecastHours = document.querySelectorAll(".hour");
const hourlyForecastWidgetTexts = document.querySelectorAll(".hourWidgetText");

// =======================
// 7-Day Forecast Elements
// =======================
const sevenDayForecastDays = document.querySelectorAll(".day");
const sevenDayForecastWidgetTexts = document.querySelectorAll(".dayWidgetText");

// =======================
// Extra Weather Widgets
// =======================
const uvIndexValue = document.querySelector(".uvIndexValue");
const uvIndexText = document.querySelector(".indexText");
const windSpeedValue = document.querySelector(".windSpeedValue");
const windSpeedText = document.querySelector(".windSpeedText");

// =======================
// Weather Code Mappings
// =======================
const weatherCodes = {
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

// =======================
// Wind Direction Conversion (Degrees → Cardinal Direction)
// =======================
const directions = [
  "North",
  "Northeast",
  "East",
  "Southeast",
  "South",
  "Southwest",
  "West",
  "Northwest",
];

// App Initialization

function initializeApp() {
  lucide.createIcons(); // Load Lucide icons
  getWeather({
    latitude: 25.07725,
    longitude: 55.30927,
  }); // Default location (Dubai, UAE)
}

// Convert wind degree to direction string

function degToDirection(deg) {
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

// Get the appropriate text content for 'feels like' widget
function getFeelsLikeText(actual, feelsLike) {
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

function getVisibilityText(km) {
  if (km >= 10) return "Visibility is excellent — great for outdoor plans.";
  if (km >= 5) return "Visibility is decent, but some haze is possible.";
  if (km >= 2) return "Visibility is reduced — caution advised.";
  return "Visibility is poor — avoid travel if possible.";
}

// Get the appropriate text content for 'humidity' widget

function getHumidityText(humidity) {
  if (humidity <= 30) return "Air is dry — stay hydrated and moisturized.";
  if (humidity <= 60) return "Humidity is comfortable and pleasant.";
  if (humidity <= 80) return "Feels a bit sticky or muggy at times.";
  return "Very humid — may feel warmer and sticky.";
}

// Get the appropriate text content for 'precipitation' widget

function getPrecipitationText(probability) {
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

function uvIndexToLevel(uv) {
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

// Render weather information to the UI

function renderInformaton(weatherData) {
  const currentTime = new Date().getHours();
  const currentYearShortened = new Date(weatherData.daily.time[1])
    .getFullYear()
    .toString()
    .slice(2);

  // Render 7-day forecast
  for (let i = 0; i <= 6; i++) {
    sevenDayForecastDays[i].innerText =
      i !== 0
        ? weatherData.daily.time[i].substring(
            weatherData.daily.time[i].indexOf("-") + 1
          ) +
          "-" +
          currentYearShortened
        : "Today";
    sevenDayForecastWidgetTexts[i].innerText =
      weatherData.daily.temperature_2m_max[i] +
      " " +
      weatherData.daily_units.temperature_2m_max;

    // Render hourly forecast
    hourlyForecastHours[i].innerText =
      i !== 0 ? weatherData.hourly.time[currentTime + i].split("T")[1] : "Now";
    hourlyForecastWidgetTexts[i].innerText =
      weatherData.hourly.temperature_2m[currentTime + i] +
      " " +
      weatherData.hourly_units.temperature_2m;
  }

  // Render current weather values
  temperature.innerText =
    weatherData.hourly.temperature_2m[currentTime + 1] +
    " " +
    weatherData.hourly_units.temperature_2m;
  weatherCode.innerText =
    weatherCodes[weatherData.hourly.weather_code[currentTime + 1]];

  feelsLikeTemperature.innerText =
    weatherData.hourly.apparent_temperature[currentTime + 1] +
    " " +
    weatherData.hourly_units.temperature_2m;
  feelsLikeExtraText.innerText = getFeelsLikeText(
    weatherData.hourly.temperature_2m[currentTime + 1],
    weatherData.hourly.apparent_temperature[currentTime + 1]
  );

  precipitationValue.innerText =
    weatherData.hourly.precipitation_probability[currentTime + 1] +
    " " +
    weatherData.hourly_units.precipitation_probability;
  precipitationExtraText.innerText = getPrecipitationText(
    weatherData.hourly.precipitation_probability[currentTime + 1]
  );

  visibility.innerText =
    weatherData.hourly.visibility[currentTime + 1] / 1000 + " Km";
  visibilityExtraText.innerText = getVisibilityText(
    weatherData.hourly.visibility[currentTime + 1] / 1000
  );

  humidityValue.innerText =
    weatherData.hourly.relative_humidity_2m[currentTime + 1] +
    " " +
    weatherData.hourly_units.relative_humidity_2m;
  humidityExtraText.innerText = getHumidityText(
    weatherData.hourly.relative_humidity_2m[currentTime + 1]
  );

  uvIndexValue.innerText = weatherData.hourly.uv_index[currentTime + 1];
  uvIndexText.innerText = uvIndexToLevel(
    weatherData.hourly.uv_index[currentTime + 1]
  );

  windSpeedValue.innerText =
    weatherData.hourly.wind_speed_10m[currentTime + 1] +
    " " +
    weatherData.hourly_units.wind_speed_10m;
  windSpeedText.innerText =
    "Winds blowing " +
    degToDirection(weatherData.hourly.wind_direction_10m[currentTime + 1]);
}

// Fetch weather data based on coordinates

function getWeather(geoLocationDataObject) {
  const latitude = geoLocationDataObject.latitude;
  const longitude = geoLocationDataObject.longitude;

  const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,weather_code&hourly=temperature_2m,weather_code,precipitation_probability,apparent_temperature,relative_humidity_2m,wind_speed_10m,visibility,uv_index,wind_direction_10m`;

  fetch(WEATHER_API_URL).then((response) => {
    response.json().then((weatherData) => {
      renderInformaton(weatherData);
    });
  });
}

// Handle result from geolocation search

function checkResult(geoLocationData) {
  if (geoLocationData.results == undefined) {
    // Show error if no results found
    searchBox.classList.add("error");
    searchBox.value = "";
    searchBox.setAttribute(
      "placeholder",
      "Sorry, we couldn't find that location"
    );
  } else {
    // Set the location name in UI and fetch weather for it
    searchBox.classList.remove("error");
    searchBox.setAttribute("placeholder", "Search for your city..");
    place.innerText =
      geoLocationData.results[0].name +
      ", " +
      geoLocationData.results[0].country;
    getWeather(geoLocationData.results[0]);
  }
}

// Perform city/location search via geocoding API

function performSearch(searchValue) {
  searchButtonText.classList.add("hidden");
  loaderIcon.classList.remove("hidden");

  const GEOCODING_API_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${searchValue}&count=1&language=en&format=json`;

  fetch(GEOCODING_API_URL).then((response) => {
    response.json().then((data) => {
      checkResult(data);
      loaderIcon.classList.add("hidden");
      searchButtonText.classList.remove("hidden");
    });
  });
}

// Validate search input and trigger search

function validateSearchText() {
  const searchValue = searchBox.value;
  if (searchValue === "") {
    searchBox.classList.add("error");
  } else {
    searchBox.classList.remove("error");
    performSearch(searchValue);
  }
}

// Event Listeners

searchButton.addEventListener("click", validateSearchText);
window.addEventListener("load", initializeApp);
