<template>
  <article class="weather-box">
    <div class="weather-box__local">
      <p>{{ propCity.name }}</p>
      <svg v-if="whichCardBackVisible" role="img" class="weather-box__btn close-btn" @click="toggleCardBack('')">
        <use href="@/assets/ui-sprite.svg#chevron-down"></use>
      </svg>
      <p v-else>{{ propCity.time }}</p>
    </div>

    <div class="weather-box__visual">
      <img :src="`../icons/${propCity.weatherIcon}.png`" :alt="propCity.weatherDesc" />
      <p>{{ propCity.weatherDesc }}</p>
    </div>

    <div class="weather-box__details">
      <ul>
        <li>{{ propCity.windSpeed }} km/h</li>
        <li>{{ propCity.humidity }}%</li>
        <li>{{ propCity.pressure }}hPa</li>
      </ul>
      <h2>{{ propCity.temp }}&deg;</h2>
    </div>

    <svg role="img" class="weather-box__btn" @click="toggleCardBack(propCity.name)">
      <use href="@/assets/ui-sprite.svg#chevron-up"></use>
    </svg>

    <weather-box-back v-if="whichCardBackVisible" :the-city="propCity.name"></weather-box-back>
  </article>
</template>

<script>
import WeatherBoxBack from "@/components/WeatherBoxBack.vue";
export default {
  props: ["propCity"],
  components: { WeatherBoxBack },
  computed: {
    whichCardBackVisible() {
      const city = this.$store.getters.getCardStatus;
      return this.propCity.name === city ? true : false;
    },
  },
  methods: {
    toggleCardBack(city) {
      this.$store.commit("storeCardBackStatus", city);
    },
  },
};
</script>

<style scope lang="scss">
.weather-box {
  position: relative;
  background: linear-gradient(to bottom left, #333, #111);
  padding: 3rem 3rem 1rem 3rem;
  border-radius: 8px;
  box-shadow: 0 0 2px rgba(139, 139, 139, 0.5);
  overflow: hidden;

  &__local p:first-child {
    background-color: #222;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
    padding: 0.6rem 2.6rem;
  }

  &__local,
  &__details {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__visual {
    text-align: center;
    margin: 2rem 0 6rem 0;

    & > img {
      width: 12rem;
      height: 12rem;
    }

    & > p {
      text-transform: capitalize;
      letter-spacing: 0.5px;
    }
  }

  &__details {
    & > ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      list-style: none;
      letter-spacing: 1px;
    }

    & > h2 {
      font-size: 5.2rem;
      font-weight: 300;
    }
  }

  &__btn {
    display: block;
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
    cursor: pointer;

    &.close-btn {
      margin: 0;
    }
  }
}
</style>
