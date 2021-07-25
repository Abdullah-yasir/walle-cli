const fs = require('fs');
const os = require('os');
const { makeDirRecursive, capitalize, osPath } = require('../utils');
const configProvider = require("../utils/configProvider");

const screenBody = (name) => {
  return `
  import React from 'react';
  import { View, Text, StyleSheet } from 'react-native';

  export const ${name} = (props) => {
    const { children } = props;
    return (
      <View style={styles.screen}>
        <Text>{children}</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    screen:{}
  });
  `
}

module.exports = (argv) => {
  const { screens: screensFolder } = configProvider().directories;
  const screenName = capitalize(argv.name);
  const exportLine = `export { default as ${screenName} } from './${screenName}'; ${os.EOL}`
  const screenPath = `${screensFolder}/${screenName}.js`;

  const fsCallback = (err) => {
    if (err) console.log(err);
    console.log(`created screen ${osPath(screenPath)}`);
  }

  makeDirRecursive(screensFolder);
  // create component file
  fs.writeFile(screenPath, screenBody(screenName), fsCallback);
  // create import of comp in index file
  fs.appendFile(`${screensFolder}/index.js`, exportLine, fsCallback)
}