<template>
  <main class="grid-container">
    <weather-box v-for="city in cities" :key="city" :prop-city="city"></weather-box>
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
