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

module.exports = {
  camelToSnakeCase
};