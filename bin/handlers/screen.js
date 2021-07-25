const fs = require('fs');
const os = require('os');
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

  try {
    if (!fs.existsSync(screensFolder)) {
      fs.mkdirSync(screensFolder, { recursive: true })
    }
  } catch (err) {
    console.log('Unable to create ./screens folder');
  }
  const screenName = argv.name;
  const exportLine = `export { default as ${screenName} } from './${screenName}'; ${os.EOL}`
  const fsCallback = (err) => {
    if (err) console.log(err);
    console.log(`created screen ${argv.name}`);
  }
  // create component file
  fs.writeFile(`${screensFolder}/${screenName}.js`, screenBody(screenName), fsCallback);
  // create import of comp in index file
  fs.appendFile(`${screensFolder}/index.js`, exportLine, fsCallback)
}