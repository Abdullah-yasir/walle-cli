const fs = require('fs');
const os = require('os');
const { makeDirRecursive, capitalize, osPath } = require('../utils');
const configProvider = require("../utils/configProvider");

const modelBody = (name) => {
  const { models: modelsFolder } = configProvider().directories;
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
  const { models: modelsFolder } = configProvider().directories;
  const modelName = capitalize(argv.name);
  const exportLine = `export { default as ${modelName} } from './${modelName}'; ${os.EOL}`
  const modelPath = `${modelsFolder}/${modelName}.js`;
  const fsCallback = (err) => {
    if (err) console.log(err);
    console.log(`created model ${osPath(modelPath)}`);
  }
  makeDirRecursive(modelsFolder);
  // create model file
  fs.writeFile(modelPath, modelBody(modelName), fsCallback);
  // create import of comp in index file
  fs.appendFile(`${modelsFolder}/index.js`, exportLine, fsCallback)
}