const fs = require('fs');
const os = require('os');
const { camelToSnakeCase, makeDirRecursive, osPath } = require('../utils');
const configProvider = require("../utils/configProvider");

module.exports = (argv) => {
  const { constants: constantsFolder } = configProvider().directories;

  const constantName = camelToSnakeCase(argv.key).toUpperCase(); // convert snake case then uppercase
  const defaultValue = argv.value || constantName; // convert snake case then uppercase
  const constantValue = typeof defaultValue === 'number' ? defaultValue : `'${defaultValue}'`; // convert string to number if needed
  const constString = `export const ${constantName} = ${constantValue}; ${os.EOL}`; // string to write in file
  const constantPath = `${constantsFolder}/index.js`;

  const appendFileCallback = (err) => {
    if (err) console.log(err);
    console.log(`created const ${osPath(constantPath)}`);
    console.log(`const ${constantName} = ${constantValue}`);
  }

  makeDirRecursive(constantsFolder);

  fs.appendFile(constantPath, constString, appendFileCallback)
}