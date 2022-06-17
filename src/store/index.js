import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      cities: ["Istanbul", "Munich", "Paris", "London", "Glasgow"],
      cityWeather: {},
    };
  },
  getters: {
    getCities(state) {
      return state.cities;
    },
    getCityWeather(state) {
      return state.cityData;
    },
  },
  mutations: {
    storeCityWeather(state, payload) {
      state.cityData = payload;
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
      context.commit("storeCityWeather", responseData);
    },
  },
});
