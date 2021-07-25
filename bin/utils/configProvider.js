const { existsSync, readFileSync } = require('fs');
const { CONFIG_FILENAME, CONFIG_DEFAULTS } = require('../constants');

const configProvider = function () {
  if (existsSync(CONFIG_FILENAME)) {
    let fileContents = readFileSync(CONFIG_FILENAME, { encoding: 'utf8', flag: 'r' });
    return JSON.parse(fileContents);
  }
  return CONFIG_DEFAULTS;
}

module.exports = configProvider;