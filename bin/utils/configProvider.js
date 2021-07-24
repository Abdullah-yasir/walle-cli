const fs = require('fs');
const { CONFIG_FILENAME, CONFIG_DEFAULTS } = require('../constants');

const configProvider = function () {
  let config = CONFIG_DEFAULTS;
  // if config file exists return after parsing it
  fs.existsSync(CONFIG_FILENAME) &&
    fs.readFileSync(CONFIG_FILENAME, function (err, fileContents) {
      if (err) console.log(err);
      config = JSON.parse(fileContents);
    })
  return config;
}

module.exports = configProvider;