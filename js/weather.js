const API_KEY = "fe54b16198d081b7737e7a675eb826da";
const feelLikeDisplay = document.querySelector(".feel-like > span");
const windDisplay = document.querySelector(".wind > span");
const weatherDisplay = document.querySelector(".weather > img");
const locationDisplay = document.querySelector(".location");
const temperatureDisplay = document.querySelector(".temperature > span");
const weatherSelect = document.querySelector("#weather-select");
const info = document.querySelector(".info");

let isSearching = false;

weatherSelect.addEventListener("change", (e) => {
  const city = e.target.value;
  getWeather(city);
});

const getWeather = async (city) => {
  if (isSearching) return;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  getSpinner(isSearching);
  const res = await axios.get(url);
  const { main, weather, wind, name } = res.data;
  const temperature = getTemperature(main.temp);
  const feelLike = getTemperature(main.feels_like);
  const weatherIconUrl = getWeatherIconUrl(weather[0].icon);
  const windSpeed = wind.speed;
  temperatureDisplay.innerText = temperature;
  weatherDisplay.setAttribute("src", weatherIconUrl);
  feelLikeDisplay.innerText = feelLike;
  windDisplay.innerText = windSpeed;
  locationDisplay.innerText = name;
  getSpinner(isSearching);
};

const getTemperature = (temperature) => {
  return (temperature - 273.15).toFixed(1) * 1;
};

const getWeatherIconUrl = (icon) => {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

const getSpinner = (state) => {
  if (!state) {
    info.style.display = "none";
    spinner.style.display = "block";
  } else {
    info.style.display = "flex";
    spinner.style.display = "none";
  }
  isSearching = !isSearching;
};
