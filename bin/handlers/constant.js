const fs = require('fs');
const os = require('os');


const camelToSnakeCase = (str) => {
  //if string provided is already all uppercase, return original str
  if (str === str.toUpperCase()) return str;

  // convert camel case to snake case
  return str.replace(/[A-Z]/g, (letter, index) => {
    let letterWithUnderscore = `_${letter}`;
    // don't append '_' at start if first char is uppercase
    if (index === 0) letterWithUnderscore = letter;
    // if previous letter is '_' don't append new '_'
    if (str[index - 1] === '_') letterWithUnderscore = letter;
    return letterWithUnderscore;
  })
};

module.exports = (argv) => {
  const FILE_NAME = 'constants.js';
  const constantName = camelToSnakeCase(argv.key).toUpperCase(); // convert snake case then uppercase
  const constantValue = argv.value || constantName; // convert snake case then uppercase
  const constString = `export const ${constantName} = '${constantValue}'; ${os.EOL}`; // string to write in file
  const appendFileCallback = (err) => {
    if (err) console.log(err);
    console.log(`created const ${constantName} = '${constantValue}'`)
  }
  fs.appendFile(FILE_NAME, constString, appendFileCallback)
}