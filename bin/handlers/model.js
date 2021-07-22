const fs = require('fs');
const os = require('os');

const modelsFolder = './test/models';

const modelBody = (name) => {
  return `
    export class ${name} {
      constructor(
        id,name,createdAt
      ){
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;

        //methods
        this.getId = function(){
          return this.id?.toString();
        }
      }
    }
  `
}

module.exports = (argv) => {
  // check if models folder exists
  // if doesn't try to create new one
  try {
    if (!fs.existsSync(modelsFolder)) {
      fs.mkdirSync(modelsFolder)
    }
  } catch (err) {
    console.log(`Unable to create ${modelsFolder} folder`);
  }
  // capitalize first char of str
  const modelName = argv.name;
  const exportLine = `export { default as ${modelName} } from './${modelName}'; ${os.EOL}`
  const fsCallback = (err) => {
    if (err) console.log(err);
    console.log(`created model ${argv.name}`);
  }
  // create model file
  fs.writeFile(`${modelsFolder}/${modelName}.js`, modelBody(modelName), fsCallback);
  // create import of comp in index file
  fs.appendFile(`${modelsFolder}/index.js`, exportLine, fsCallback)
}