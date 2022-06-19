<template>
  <div class="grid-container">
    <header>
      <the-header></the-header>
    </header>
    <weather-box v-for="city in cityWeather" :key="city.id" :prop-city="city"></weather-box>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import WeatherBox from "./components/WeatherBox.vue";

export default {
  name: "App",
  components: {
    WeatherBox,
    TheHeader,
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
  gap: 4rem 10rem;

  header {
    grid-column: 1 / -1;
  }

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
