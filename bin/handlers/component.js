const fs = require('fs');
const os = require('os');

const componentsFolder = './test/components';

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
  // check if components folder exists
  // if doesn't try to create new one
  try {
    if (!fs.existsSync(componentsFolder)) {
      fs.mkdirSync(componentsFolder)
    }
  } catch (err) {
    console.log(`Unable to create ${componentsFolder} folder`);
  }
  // capitalize first char of str
  const componentName = argv.name;
  const exportLine = `export { default as ${componentName} } from './${componentName}'; ${os.EOL}`
  const fsCallback = (err) => {
    if (err) console.log(err);
    console.log(`created component ${argv.name}`);
  }
  // create component file
  fs.writeFile(`${componentsFolder}/${componentName}.js`, compBody(componentName), fsCallback);
  // create import of comp in index file
  fs.appendFile(`${componentsFolder}/index.js`, exportLine, fsCallback)
}