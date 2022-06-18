<template>
  <div class="weather-box-back">
    <div v-for="threeHourly in getCityForecast" :key="threeHourly.dt">
      <div class="weather-box-back__visual">
        <img :src="`../icons/${threeHourly.weatherIcon}.png`" :alt="threeHourly.weatherDesc" />
        <p>{{ threeHourly.weatherDesc }}</p>
        <p>
          <strong>{{ threeHourly.temp }}&deg;</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["theCity"],
  computed: {
    getCityForecast() {
      return this.$store.getters.getCityForecast;
    },
  },
  mounted() {
    this.$store.dispatch("fetchThreeDaysForecast", this.theCity);
  },
};
</script>

<style scope lang="scss">
.weather-box-back {
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  padding: 1rem;
  justify-items: center;
  bottom: 0px;
  left: 0px;
  height: 80%;
  width: 100%;
  background-color: rgba(30, 30, 30, 0.2);
  backdrop-filter: blur(15px);
  overflow-y: scroll;
  font-size: 1.2rem;

  &__visual {
    text-align: center;

    & > img {
      width: 3.2rem;
      height: 3.2rem;
    }

    & > p {
      text-transform: capitalize;
    }
  }
}
</style>
