<template>
  <main>
    <div>
      <img src="@/assets/img/rainy.jpg" id="main-bg" alt="" />
    </div>
    <weather-info></weather-info>
  </main>
</template>

<script>
import WeatherInfo from "./components/WeatherInfo.vue";

export default {
  name: "App",
  components: {
    WeatherInfo,
  },
};
</script>

<style lang="scss">
main {
  position: relative;
  height: 100vh;
  background-color: #111;
  z-index: -100;
}

#main-bg {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
}
</style>
