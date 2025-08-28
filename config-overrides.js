module.exports = function override(config) {
  config.output.filename = "recycling-game-widget.js";
  config.output.libraryTarget = "umd";
  return config;
};