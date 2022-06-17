<template>
  <article class="weather-box">
    <div class="weather-box__local">
      <p class="weather-box__city">Münster</p>
      <p>16:05</p>
    </div>
    <div class="weather-box__visual">
      <img src="" alt="" />
    </div>
    <div class="weather-box__details">
      <ul>
        <li>11km/h</li>
        <li>95%</li>
        <li>1.5h</li>
      </ul>
      <div>
        <h2>8 &deg;</h2>
      </div>
    </div>
  </article>
</template>

<style scope lang="scss">
.weather-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 30rem;
  background: linear-gradient(to bottom left, #111, #222);
  padding: 2rem;
  border: 1px solid #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px 10px #000;

  & .weather-box__local,
  & .weather-box__details {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
