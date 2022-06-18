<template>
  <div class="weather-box-back">
    <div v-for="threeHourly in getCityForecast" :key="threeHourly.time">
      <div class="weather-box-back__visual">
        <img :src="`../icons/${threeHourly.weatherIcon}.png`" :alt="threeHourly.weatherDesc" />
        <p>{{ threeHourly.weatherDesc }}</p>
        <p>{{ threeHourly.time.formattedDate }} {{ threeHourly.time.formattedTime }}</p>
        <p>{{ threeHourly.temp }}&deg;</p>
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
  grid-template-columns: 1fr 1fr;
  gap: 4rem 2rem;
  padding: 1rem;
  justify-items: center;
  bottom: 0px;
  left: 0px;
  height: 83%;
  width: 100%;
  background-color: rgba(20, 20, 20, 0.1);
  backdrop-filter: blur(14px);
  overflow-y: scroll;
  font-size: 1.2rem;

  &__visual {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 10rem;

    & > img {
      width: 3.2rem;
      height: 3.2rem;
    }

    & > p {
      text-transform: capitalize;
    }

    & > p:last-child {
      font-size: 2rem;
    }
  }
}
</style>
