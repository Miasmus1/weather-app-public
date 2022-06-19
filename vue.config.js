const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/weather-app-public",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/sass/base/_variables.scss";`,
      },
    },
  },
});
