import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      cities: ["Istanbul", "Munich", "Paris", "London", "Glasgow"],
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
    async fetchWeather(context, payload) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=${process.env.VUE_APP_OPEN_WEATHER_MAP_KEY}&units=metric`
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch requests");
        throw error;
      }
      console.log(responseData);

      function convertTimezone(unix, timezone) {
        const localTime = unix + timezone; // in seconds

        const minutes = Math.floor((localTime / 60) % 60);
        const hours = Math.floor((localTime / 60 / 60) % 24);
        const formattedTime = [hours.toString().padStart(2, "0"), minutes.toString().padStart(2, "0")].join(":");

        return formattedTime;
      }

      const cityWeatherData = {
        id: responseData.id,
        name: responseData.name,
        time: convertTimezone(responseData.dt, responseData.timezone),
        temp: Math.round(+responseData.main.temp),
        windSpeed: responseData.wind.speed,
        humidity: responseData.main.humidity,
        pressure: responseData.main.pressure,
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
        const error = new Error(responseData.message || "Failed to fetch requests");
        throw error;
      }
      console.log(responseData);

      let filteredForecastArray = [];
      responseData.list.forEach((weather) => {
        let filterObject = {
          id: weather.dt,
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
