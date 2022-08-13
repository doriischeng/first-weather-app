//👨‍🏫 Your task
//In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

//Please note: there's no need to include a temperature conversion at the moment. This will be taught later on in the course.

//🙀 Bonus point:
//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
h2.innerHTML = `${day} ${hours}:${minutes}`;

function showTemp(response) {
  document.querySelector("h1").innerHTML =
    response.data.name;
  let temperature = Math.round(
    response.data.main.temp
  );
  let temperatureElement = document.querySelector(
    ".temperature"
  );
  temperatureElement.innerHTML = temperature;
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed);
  document.querySelector("#conditon").innerHTML =
    response.data.weather[0].description;
}

function search(city) {
  let apiKey = "4a57d92459ebaebf0556db5aa7e8c670";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemp);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector(
    "#search-text-input"
  ).value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "4a57d92459ebaebf0556db5aa7e8c670";
  let unit = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(
    searchLocation
  );
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

function convert(event) {
  event.preventDefault();
  let temperature = document.querySelector(
    ".temperature"
  );
  temperature.innerHTML = 82;
}
let fahrenheit = document.querySelector(
  ".fahrenheit-degree"
);
fahrenheit.addEventListener("click", convert);

function convertBack(event) {
  event.preventDefault();
  let temperature = document.querySelector(
    ".temperature"
  );
  temperature.innerHTML = 24;
}
let celsius = document.querySelector(
  ".celsius-degree"
);
celsius.addEventListener("click", convertBack);

let currentLocationButton =
  document.querySelector("#current-location");
currentLocationButton.addEventListener(
  "click",
  getCurrentLocation
);
search("Hong Kong");
