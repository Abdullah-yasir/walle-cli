const fs = require('fs');
import { dirStructure } from '../configs'

module.exports = (argv) => {
  try {
    dirStructure.forEach((dir) => {
      !fs.existsSync(dir) && fs.mkdirSync(dir)
    })
  } catch (err) {
    console.log('could not create dir')
  }
  console.log(`setting ${argv.project_name}`)
}