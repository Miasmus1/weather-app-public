import { createStore } from "vuex";

function convertTimezone(unix, timezone) {
  const localTime = unix + timezone; // local time based on openmapweather data in seconds

  const minutes = Math.floor((localTime / 60) % 60);
  const hours = Math.floor((localTime / 60 / 60) % 24);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const localTimezoneOffset = new Date(localTime * 1000).getTimezoneOffset() * 60 * 1000; // getting browser's local timezone (for Istanbul it is -3hrs offset)
  const monthIndex = new Date(localTime * 1000 + localTimezoneOffset).getMonth();
  const day = new Date(localTime * 1000 + localTimezoneOffset).getDate();
  /* getMonth() and getDate() methods always uses browser's local timezone. 
  Since i already have local dates for different cities, i deduct browser's timezone */

  const formattedDate = `${day} ${months[monthIndex]}`;
  const formattedTime = [hours.toString().padStart(2, "0"), minutes.toString().padStart(2, "0")].join(":");

  return { formattedDate, formattedTime };
}

export default createStore({
  state() {
    return {
      cities: ["Istanbul", "Munich", "Paris", "London", "Glasgow", "Culloden"],
      visibleCardBack: "",
      citiesWeather: [],
      cityForecast: [],
    };
  },
  getters: {
    getCities(state) {
      return state.cities;
    },
    getCityWeather(state) {
      return state.citiesWeather;
    },
    getCityForecast(state) {
      return state.cityForecast;
    },
    getCardStatus(state) {
      return state.visibleCardBack;
    },
  },
  mutations: {
    storeCityWeather(state, payload) {
      state.citiesWeather.push(payload);
    },
    storeCityForecast(state, payload) {
      state.cityForecast = payload;
    },
    storeCardBackStatus(state, payload) {
      state.visibleCardBack = payload;
    },
  },
  actions: {
    // İlgili Açıklamalar: https://github.com/Miasmus1/weather-app-public#22-async-function-nedir //
    async fetchWeather(context, payload) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=${process.env.VUE_APP_OPEN_WEATHER_MAP_KEY}&units=metric`
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch request");
        throw error;
      }

      const cityWeatherData = {
        id: responseData.id,
        name: responseData.name,
        time: convertTimezone(responseData.dt, responseData.timezone),
        temp: Math.round(+responseData.main.temp),
        windSpeed: responseData.wind.speed.toFixed(1),
        humidity: responseData.main.humidity,
        sunset: convertTimezone(responseData.sys.sunset, responseData.timezone),
        weatherDesc: responseData.weather[0].description,
        weatherIcon: responseData.weather[0].icon,
      };
      context.commit("storeCityWeather", cityWeatherData);
    },

    async fetchThreeDaysForecast(context, payload) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${payload}&appid=${process.env.VUE_APP_OPEN_WEATHER_MAP_KEY}&units=metric`
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch request");
        throw error;
      }

      const { timezone } = responseData.city;

      let filteredForecastArray = [];
      responseData.list.forEach((weather) => {
        let filterObject = {
          time: convertTimezone(weather.dt, timezone),
          temp: Math.round(+weather.main.temp),
          weatherIcon: weather.weather[0].icon,
          weatherDesc: weather.weather[0].description,
        };
        filteredForecastArray.push(filterObject);
      });

      context.commit("storeCityForecast", filteredForecastArray);
    },
  },
});
