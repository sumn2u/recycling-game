const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.filename = "recycling-game-widget.js";
      webpackConfig.output.library = "RecyclingGameWidget";
      webpackConfig.output.libraryTarget = "umd";
      webpackConfig.output.globalObject = "this";
      return webpackConfig;
    },
  },
};
