<template>
  <div class="header">
    <h1>the.weather</h1>
    <a href="https://github.com/Miasmus1/weather-app-public#theweather" target="_blank">
      <svg role="img">
        <use href="@/assets/ui-sprite.svg#github"></use>
      </svg>
    </a>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $white-shade-1;
  margin-bottom: -1.5rem;

  & > h1 {
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 1;
  }

  & svg {
    fill: $white-shade-1;
    width: 4.2rem;
    height: 4.2rem;
  }

  & svg:hover {
    fill: $black-shade-2;
    stroke: $white-shade-1;
  }
}
</style>
