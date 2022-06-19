<template>
  <main class="grid-container">
    <weather-box v-for="city in cityWeather" :key="city.id" :prop-city="city"></weather-box>
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
  width: 70%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 32rem 32rem 32rem;
  justify-content: center;
  gap: 5rem 10rem;

  @include responsive(tablet-landscape) {
    grid-template-columns: 32rem 32rem;
  }

  @include responsive(mobile) {
    grid-template-columns: 32rem;
  }

  @include responsive(mobile-xs) {
    font-size: 1.2rem;
    grid-template-columns: 25rem;
  }
}
</style>
