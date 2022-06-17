<template>
  <article class="weather-box">
    <div class="weather-box__local">
      <p>{{ propCity }}</p>
      <p>16:05</p>
    </div>
    <div class="weather-box__visual">
      <svg role="img">
        <use href="@/assets/weather-sprite.svg#thunder"></use>
      </svg>
      <p>Heavy Rain</p>
    </div>
    <div class="weather-box__details">
      <ul>
        <li>11km/h</li>
        <li>95%</li>
        <li>1.5h</li>
      </ul>
      <h2>8&deg;</h2>
    </div>
  </article>
</template>

<script>
export default {
  props: ["propCity"],
};
</script>

<style scope lang="scss">
.weather-box {
  background: linear-gradient(to bottom left, #222, #000);
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 0 2px rgba(139, 139, 139, 0.5);

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
    margin-bottom: 6rem;
  }

  &__details {
    & > ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      list-style: none;
    }

    & > h2 {
      font-size: 5.2rem;
      font-weight: 300;
    }
  }
}
</style>
