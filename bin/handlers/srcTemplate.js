const fs = require('fs');
const { DIR_STRUCTURE } = require('../constants');


module.exports = (argv) => {
  try {
    DIR_STRUCTURE.forEach((dir) => {
      !fs.existsSync(dir) && fs.mkdirSync(dir)
    })
  } catch (err) {
    console.log('could not create dir template')
  }
  console.log(`created src dir template`)
}