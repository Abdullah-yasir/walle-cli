const fs = require('fs');
const os = require('os');
const { camelToSnakeCase, makeDirRecursive, osPath, isDuplicate } = require('../utils');
const configProvider = require("../utils/configProvider");

module.exports = (argv) => {
  const { constants: constantsFolder } = configProvider().directories;

  const constantName = camelToSnakeCase(argv.key).toUpperCase(); // convert snake case then uppercase
  const defaultValue = argv.value || constantName; // convert snake case then uppercase
  const constantValue = typeof defaultValue === 'number' ? defaultValue : `'${defaultValue}'`; // convert string to number if needed
  const constString = `export const ${constantName} = ${constantValue}; ${os.EOL}`; // string to write in file
  const constantPath = `${constantsFolder}/index.js`;


  // check if constantName is already exist in constants folder/index.js

  isDuplicate(constantPath, constantName, (duplicate) => {
    if (duplicate) {
      console.log(`${constantName} is already exist in ${constantPath}`);

    } else {
      makeDirRecursive(constantsFolder); // create folder if not exist

      fs.appendFile(constantPath, constString, (err) => {
        if (err) console.log(err);
        console.log(`created const ${osPath(constantPath)}`);
        console.log(`const ${constantName} = ${constantValue}`);
      })
    }
  });



}