// const webpack = require("webpack");
// const nodeExternals = require("webpack-node-externals");

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      // new webpack.optimize.LimitChunkCountPlugin({
      //   maxChunks: 6
      // })
    ],
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        "chart.js": "chart.js/dist/Chart.js",
      },
      fallback: {
        https: require.resolve('https-browserify'),// Add fallback for 'http' module
        http: require.resolve('stream-http') // Add fallback for 'http' module
      }
    },
  },
  pwa: {
    name: "Vue Black Dashboard",
    themeColor: "#344675",
    msTileColor: "#344675",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#344675",
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== "production",
  },
};
