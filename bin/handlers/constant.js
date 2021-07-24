const fs = require('fs');
const os = require('os');
const { camelToSnakeCase } = require('../utils');
const configProvider = require("../utils/configProvider");
const { constants: constantsFolder } = configProvider().directories;


module.exports = (argv) => {
  const constantName = camelToSnakeCase(argv.key).toUpperCase(); // convert snake case then uppercase
  const constantValue = argv.value || constantName; // convert snake case then uppercase
  const constString = `export const ${constantName} = '${constantValue}'; ${os.EOL}`; // string to write in file
  const appendFileCallback = (err) => {
    if (err) console.log(err);
    console.log(`created const ${constantName} = '${constantValue}'`)
  }

  try {
    if (!fs.existsSync(constantsFolder)) {
      fs.mkdirSync(constantsFolder, { recursive: true })
    }
  } catch (err) {
    console.log(`Unable to create ${constantsFolder} folder`);
  }

  fs.appendFile(`${constantsFolder}/index.js`, constString, appendFileCallback)
}