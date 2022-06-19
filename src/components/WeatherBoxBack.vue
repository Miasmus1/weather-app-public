<template>
  <div class="weather-box-back">
    <div v-for="threeHourly in getCityForecast" :key="threeHourly.time" class="weather-box-back__visual">
      <img :src="require(`@/assets/icons/${threeHourly.weatherIcon}.png`)" :alt="threeHourly.weatherDesc" />
      <p>{{ threeHourly.weatherDesc }}</p>
      <p>{{ threeHourly.time.formattedDate }} {{ threeHourly.time.formattedTime }}</p>
      <p>{{ threeHourly.temp }}&deg;</p>
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

<style scoped lang="scss">
.weather-box-back {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-items: center;
  gap: 1rem;
  padding: 1rem;
  bottom: 0px;
  left: 0px;
  height: 85%;
  width: 100%;
  background-color: rgba(20, 20, 20, 0.1);
  backdrop-filter: blur(14px);
  overflow-y: scroll;
  font-size: 1.2rem;

  &__visual {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;

    & > img {
      width: 3.2rem;
      height: 3.2rem;
    }

    & > p {
      text-transform: capitalize;
    }

    & > p:nth-child(2) {
      flex-basis: 35%;
    }

    & > p:nth-child(3) {
      flex-basis: 30%;
    }

    & > p:last-child {
      flex-basis: 15%;
      text-align: end;
      font-size: 2rem;
    }
  }
}
</style>
