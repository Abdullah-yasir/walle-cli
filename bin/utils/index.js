const { existsSync, mkdirSync, readFile } = require('fs');
const { sep } = require('path');

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

const makeDirRecursive = (dirName) => {
  try {
    if (!existsSync(dirName)) {
      mkdirSync(dirName, { recursive: true })
    }
  } catch (err) {
    console.log(`Unable to create ${dirName} folder`);
  }
}

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const osPath = (pathStr) => {
  return pathStr.replace(/[\/]/g, sep);
}

const isDuplicate = (filePath, needle, cb) => {
  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return true;
    }

    if (data.includes(needle)) return cb(true);

    return cb(false);
  })
}

module.exports = {
  camelToSnakeCase,
  makeDirRecursive,
  capitalize,
  osPath,
  isDuplicate
};