const fs = require('fs');
const os = require('os');
const { makeDirRecursive, capitalize, osPath } = require('../utils');
const configProvider = require("../utils/configProvider");

const compBody = (name) => {
  return `
  import React from 'react';
  import {View, Text, StyleSheet} from 'react-native';

  export const ${name} = (props) => {
    const {children} = props;
    return (
      <View style={styles.component}>
        <Text>{children}</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    component:{}
  });
  `
}

module.exports = (argv) => {
  const { components: componentsFolder } = configProvider().directories;
  makeDirRecursive(componentsFolder); // create comp folder if doesn't exist
  const componentName = capitalize(argv.name);
  const compPath = `${componentsFolder}/${componentName}.js`;
  const exportLine = `export { default as ${componentName} } from './${componentName}'; ${os.EOL}`

  const fsCallback = (err) => {
    if (err) console.log(err);
    console.log(`created component ${osPath(compPath)}`);
  }
  // create component file
  fs.writeFile(compPath, compBody(componentName), fsCallback);
  // create import of comp in index file
  fs.appendFile(`${componentsFolder}/index.js`, exportLine, fsCallback)
}