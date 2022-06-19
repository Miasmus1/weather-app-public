<template>
  <div class="header">
    <h1>the.weather</h1>
    <a href="https://toygarsaral.com" target="_blank">
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
  margin-top: 2rem;
  color: #ddd;
  margin-bottom: -1rem;

  & > h1 {
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 1;
  }

  & svg {
    fill: #ddd;
    width: 4.2rem;
    height: 4.2rem;
  }

  & svg:hover {
    fill: #222;
    stroke: #ddd;
  }
}
</style>
