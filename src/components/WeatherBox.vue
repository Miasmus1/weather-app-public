<template>
  <article class="weather-box">
    <div class="weather-box__local">
      <p>{{ propCity.name }}</p>
      <p>{{ propCity.time }}</p>
    </div>
    <div class="weather-box__visual">
      <svg role="img">
        <use :href="weatherIconPath"></use>
      </svg>
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
    <svg role="img" class="weather-box__toggle" @click="toggleCardBack">
      <use href="@/assets/ui-sprite.svg#chevron-up"></use>
    </svg>
    <weather-box-back v-if="isCardBackVisible"></weather-box-back>
  </article>
</template>

<script>
import WeatherBoxBack from "@/components/WeatherBoxBack.vue";
export default {
  props: ["propCity"],
  components: { WeatherBoxBack },
  data() {
    return {
      isCardBackVisible: false,
    };
  },
  computed: {
    weatherIconPath() {
      return `../weather-sprite.svg#${this.propCity.weatherIcon}`;
    },
  },
  methods: {
    toggleCardBack() {
      this.isCardBackVisible = !this.isCardBackVisible;
    },
  },
  mounted() {
    console.table(this.propCity);
  },
};
</script>

<style scope lang="scss">
.weather-box {
  position: relative;
  background: linear-gradient(to bottom left, #222, #000);
  padding: 3rem 3rem 1rem 3rem;
  border-radius: 8px;
  box-shadow: 0 0 2px rgba(139, 139, 139, 0.5);
  overflow: hidden;

  &__local p:first-child {
    background-color: #222;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
    padding: 0.4rem 2.4rem;
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

    & > svg {
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

  &__toggle {
    display: block;
    width: 3.6rem;
    height: 3.6rem;
    margin: 0 auto;
    cursor: pointer;
  }
}
</style>
