<template>
  <main class="grid-container">
    <weather-box v-for="city in cityWeather" :key="city" :prop-city="city"></weather-box>
  </main>
</template>

<script>
import WeatherBox from "./components/WeatherBox.vue";

export default {
  name: "App",
  components: {
    WeatherBox,
  },
  computed: {
    cities() {
      return this.$store.getters.getCities;
    },
    cityWeather() {
      return this.$store.getters.getCityWeather;
    },
  },
  mounted() {
    console.log(process.env.VUE_APP_OPEN_WEATHER_MAP_KEY);
    this.cities.forEach((city) => this.$store.dispatch("fetchWeather", city));
  },
};
</script>

<style lang="scss">
.grid-container {
  width: 130rem;
  margin: 5rem auto 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5rem 10rem;
}
</style>
