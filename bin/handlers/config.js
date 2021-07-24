const fs = require('fs');
const { CONFIG_DEFAULTS, CONFIG_FILENAME } = require("../constants");


module.exports = (argv) => {
  !fs.existsSync(CONFIG_FILENAME) &&
    fs.writeFileSync(CONFIG_FILENAME, JSON.stringify(CONFIG_DEFAULTS), function (err) {
      if (err) console.log(err);
      console.log('created config file');
    })
}