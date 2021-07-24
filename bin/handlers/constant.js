const fs = require('fs');
const os = require('os');
const { camelToSnakeCase } = require('../utils');

module.exports = (argv) => {
  const FILE_NAME = 'test/constants.js';
  const constantName = camelToSnakeCase(argv.key).toUpperCase(); // convert snake case then uppercase
  const constantValue = argv.value || constantName; // convert snake case then uppercase
  const constString = `export const ${constantName} = '${constantValue}'; ${os.EOL}`; // string to write in file
  const appendFileCallback = (err) => {
    if (err) console.log(err);
    console.log(`created const ${constantName} = '${constantValue}'`)
  }
  fs.appendFile(FILE_NAME, constString, appendFileCallback)
}