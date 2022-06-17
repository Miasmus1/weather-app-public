<template>
  <main class="grid-container">
    <weather-box></weather-box>
  </main>
</template>

<script>
import WeatherBox from "./components/WeatherBox.vue";

export default {
  name: "App",
  components: {
    WeatherBox,
  },
};
</script>

<style lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
