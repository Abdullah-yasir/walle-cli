const fs = require('fs');
const os = require('os');
const configProvider = require("../utils/configProvider");
const { actions: actionsFolder } = configProvider().directories;

const actionBody = (params) => {
  const { name, actionType, endpoint } = params;
  return `
import axios from 'axios';

import { ${actionType} } from '../../constants/actionTypes';
import API from '../../constants/API';
import { SUCCESS, ERROR } from '../../constants/status';

const action = (payload) => {
    return {
        type: ${actionType},
        payload,
    };
};

export default ${name} = (callback) => {
    return async (dispatch) => {
        await axios
            .get(${endpoint})
            .then(({ data }) => {
                dispatch(action(data));
                if (typeof callback === 'function')
                    callback(SUCCESS, 'Operation successful!');
            })
            .catch((err) => {
              console.log('${name} action > ', err);
                if (typeof callback === 'function')
                    callback(ERROR, 'An error occured while dispatching ${name} action!');
            });
    };
};
  `
}


// get method type from action name
// ie get, post, put, patch, delete from getUsers, putUsers, deleteUser

module.exports = (argv) => {
  const actionName = argv.name;
  const exportLine = `export { default as ${actionName} } from './${actionName}'; ${os.EOL}`;
  const config = { name: actionName, actionType: 'ACTION_NAME_SNAKE_CASE', endpoint: '/' };

  const fsCallback = (err) => {
    if (err) console.log(err);
    console.log(`created action ${argv.name}`);
  }
  // check if actions folder exists
  // if doesn't try to create new one
  try {
    if (!fs.existsSync(actionsFolder)) {
      fs.mkdirSync(actionsFolder, { recursive: true })
    }
  } catch (err) {
    console.log(`Unable to create ${actionsFolder} folder`);
  }

  // create action file
  fs.writeFile(`${actionsFolder}/${actionName}.js`, actionBody(config), fsCallback);
  // create import of comp in index file
  fs.appendFile(`${actionsFolder}/index.js`, exportLine, fsCallback)
}