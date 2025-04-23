import {
  weatherCodes,
  degToDirection,
  getFeelsLikeText,
  getVisibilityText,
  getHumidityText,
  getPrecipitationText,
  uvIndexToLevel,
} from "./utility.js";

// Top Bar Elements

const searchBox = document.querySelector(".searchBox");
const searchButton = document.querySelector(".search");
const searchButtonText = document.querySelector(".searchButtonText");
const loaderIcon = document.querySelector(".loaderIcon");

// Current Weather Section

const place = document.querySelector(".place");
const temperature = document.querySelector(".temperature");
const weatherCode = document.querySelector(".weatherCode");

// Widgets in Weather Today

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

// Hourly Forecast Elements

const hourlyForecastHours = document.querySelectorAll(".hour");
const hourlyForecastWidgetTexts = document.querySelectorAll(".hourWidgetText");

// 7-Day Forecast Elements

const sevenDayForecastDays = document.querySelectorAll(".day");
const sevenDayForecastWidgetTexts = document.querySelectorAll(".dayWidgetText");

// Extra Weather Widgets

const uvIndexValue = document.querySelector(".uvIndexValue");
const uvIndexText = document.querySelector(".indexText");
const windSpeedValue = document.querySelector(".windSpeedValue");
const windSpeedText = document.querySelector(".windSpeedText");

// App Initialization

function initializeApp() {
  lucide.createIcons(); // Load Lucide icons
  getWeather({
    latitude: 25.07725,
    longitude: 55.30927,
  }); // Default location (Dubai, UAE)
}

// Render weather information to the UI
function renderInformation(weatherData) {
  const currentHour = new Date().getHours();
  const currentYearShort = new Date(weatherData.daily.time[1])
    .getFullYear()
    .toString()
    .slice(2);

  renderSevenDayForecast(weatherData, currentYearShort);
  renderHourlyForecast(weatherData, currentHour);
  renderCurrentWeather(weatherData, currentHour);
}

function renderSevenDayForecast(data, yearShort) {
  data.daily.time.forEach((date, i) => {
    if (i > 6) return;
    const dayLabel = i === 0 ? "Today" : `${date.slice(5)}-${yearShort}`;
    sevenDayForecastDays[i].innerText = dayLabel;

    sevenDayForecastWidgetTexts[
      i
    ].innerText = `${data.daily.temperature_2m_max[i]} ${data.daily_units.temperature_2m_max}`;
  });
}

function renderHourlyForecast(data, hour) {
  for (let i = 0; i <= 6; i++) {
    const timeLabel =
      i === 0 ? "Now" : data.hourly.time[hour + i].split("T")[1];
    hourlyForecastHours[i].innerText = timeLabel;

    hourlyForecastWidgetTexts[i].innerText = `${
      data.hourly.temperature_2m[hour + i]
    } ${data.hourly_units.temperature_2m}`;
  }
}

function renderCurrentWeather(data, hour) {
  const idx = hour + 1;

  temperature.innerText = `${data.hourly.temperature_2m[idx]} ${data.hourly_units.temperature_2m}`;
  weatherCode.innerText = weatherCodes[data.hourly.weather_code[idx]];

  feelsLikeTemperature.innerText = `${data.hourly.apparent_temperature[idx]} ${data.hourly_units.temperature_2m}`;
  feelsLikeExtraText.innerText = getFeelsLikeText(
    data.hourly.temperature_2m[idx],
    data.hourly.apparent_temperature[idx]
  );

  precipitationValue.innerText = `${data.hourly.precipitation_probability[idx]} ${data.hourly_units.precipitation_probability}`;
  precipitationExtraText.innerText = getPrecipitationText(
    data.hourly.precipitation_probability[idx]
  );

  const visibilityKm = data.hourly.visibility[idx] / 1000;
  visibility.innerText = `${visibilityKm} Km`;
  visibilityExtraText.innerText = getVisibilityText(visibilityKm);

  humidityValue.innerText = `${data.hourly.relative_humidity_2m[idx]} ${data.hourly_units.relative_humidity_2m}`;
  humidityExtraText.innerText = getHumidityText(
    data.hourly.relative_humidity_2m[idx]
  );

  uvIndexValue.innerText = data.hourly.uv_index[idx];
  uvIndexText.innerText = uvIndexToLevel(data.hourly.uv_index[idx]);

  windSpeedValue.innerText = `${data.hourly.wind_speed_10m[idx]} ${data.hourly_units.wind_speed_10m}`;
  windSpeedText.innerText = `Winds blowing ${degToDirection(
    data.hourly.wind_direction_10m[idx]
  )}`;
}

// Fetch weather data based on coordinates

function getWeather(geoLocationDataObject) {
  const latitude = geoLocationDataObject.latitude;
  const longitude = geoLocationDataObject.longitude;

  const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,weather_code&hourly=temperature_2m,weather_code,precipitation_probability,apparent_temperature,relative_humidity_2m,wind_speed_10m,visibility,uv_index,wind_direction_10m`;

  fetch(WEATHER_API_URL).then((response) => {
    response.json().then((weatherData) => {
      renderInformation(weatherData);
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

window.addEventListener("keydown", (e) => {
  // If the user presses Enter, click the search button
  if (e.key == "Enter") {
    searchButton.click();
  }
});

window.addEventListener("load", initializeApp);
