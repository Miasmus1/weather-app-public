<template>
  <article class="weather-box">
    <div class="weather-box__local">
      <p>{{ propCity.name }}</p>
      <transition mode="out-in">
        <svg v-if="whichCardBackVisible" role="img" class="weather-box__btn close-btn" @click="toggleCardBack('')">
          <use href="@/assets/ui-sprite.svg#chevron-down"></use>
        </svg>

        <p v-else>{{ propCity.time.formattedTime }}</p>
      </transition>
    </div>

    <div class="weather-box__visual">
      <img :src="`../icons/${propCity.weatherIcon}.png`" :alt="propCity.weatherDesc" />
      <p>{{ propCity.weatherDesc }}</p>
    </div>

    <div class="weather-box__details">
      <ul>
        <li>
          <svg role="img">
            <use href="@/assets/ui-sprite.svg#wind"></use>
          </svg>
          {{ propCity.windSpeed }} km/h
        </li>

        <li>
          <svg role="img">
            <use href="@/assets/ui-sprite.svg#humidity"></use>
          </svg>
          {{ propCity.humidity }}%
        </li>

        <li>
          <svg role="img">
            <use href="@/assets/ui-sprite.svg#sunset"></use></svg
          >{{ propCity.sunset.formattedTime }}
        </li>
      </ul>
      <p>{{ propCity.temp }}&deg;</p>
    </div>

    <svg role="img" class="weather-box__btn" @click="toggleCardBack(propCity.name)">
      <use href="@/assets/ui-sprite.svg#chevron-up"></use>
    </svg>

    <transition>
      <weather-box-back v-if="whichCardBackVisible" :the-city="propCity.name"></weather-box-back>
    </transition>
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

<style scoped lang="scss">
.weather-box {
  position: relative;
  background: $card-background-color;
  padding: 3rem 3rem 1rem 3rem;
  border-radius: $border-radius-md;
  box-shadow: 0 0 2px rgba(191, 191, 191, 0.5);
  overflow: hidden;

  &__local {
    letter-spacing: 1.1px;

    p:first-child {
      background-color: #222;
      box-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
      padding: 0.6rem 2.6rem;
      letter-spacing: 1.2px;
    }
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

    & li {
      display: flex;
      align-items: center;
    }

    & > p:last-child {
      font-size: 5.2rem;
      letter-spacing: 1px;
    }

    & svg {
      width: 2.6rem;
      height: 2.6rem;
      margin-right: 0.8rem;
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

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease 0.12s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
