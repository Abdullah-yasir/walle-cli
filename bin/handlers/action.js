const fs = require('fs');
const os = require('os');
const { camelToSnakeCase } = require('../utils');
const configProvider = require("../utils/configProvider");
const { actions: actionsFolder } = configProvider().directories;

const actionBody = (params) => {
  const { name, actionType, endpoint, async, method } = params;
  if (!endpoint && !async) {
    return `
import { ${actionType} } from '../../constants/actionTypes';
export const ${name} = (payload) => {
  return {
    type:'${actionType}',
    payload,
  }
}
`
  }
  if (endpoint) {
    const httpMethod = name.split(/(?=[A-Z])/)[0] || method || 'get';
    let methodStatement = '';
    switch (httpMethod) {
      case 'get':
        methodStatement = `get('${endpoint}')`
        break;
      case 'post':
        methodStatement = `post('${endpoint}', payload.requestBody )`
        break;
      case 'put':
        methodStatement = `put('${endpoint}/payload.id', payload.requestBody)`
        break;
      case 'patch':
        methodStatement = `patch('${endpoint}/payload.id', payload.requestBody)`
        break;
      case 'delete':
        methodStatement = `delete('${endpoint}/payload.id')`
        break;
      default:
        break;
    }
    return `
import axios from 'axios';
import { ${actionType} } from '../../constants/actionTypes';
import { SUCCESS, ERROR } from '../../constants/status';

const action = (payload) => {
    return {
        type: ${actionType},
        payload,
    };
};

export default ${name} = (payload, callback) => {
    return async (dispatch) => {
      try {
        const {data} = await axios.${methodStatement};
        dispatch(action(data));
        if (typeof callback === 'function')
            callback(SUCCESS, 'Operation successful!');
      } catch(err) {
        console.log('${name} action > ', err);
        if (typeof callback === 'function')
            callback(ERROR, 'An error occured while dispatching ${name} action!');
      }
    };
};`
  }

  if (async && !endpoint) {
    return `
import { ${actionType} } from '../../constants/actionTypes';
import { SUCCESS, ERROR } from '../../constants/status';

const action = (payload) => {
    return {
        type: ${actionType},
        payload,
    };
};

export default ${name} = (payload, callback) => {
    return async (dispatch) => {
      try {
        const {data} = await setTimeout(()=>{
          return {
            data: 'This is executed after 2 seconds'
          }
        },2000);
        
        dispatch(action(data));
        if (typeof callback === 'function')
            callback(SUCCESS, 'Operation successful!');
      } catch(err) {
        console.log('${name} action > ', err);
        if (typeof callback === 'function')
            callback(ERROR, 'An error occured while dispatching ${name} action!');
      }
    };
}
    `
  }

}

// get method type from action name
// ie get, post, put, patch, delete from getUsers, putUsers, deleteUser

module.exports = (argv) => {
  console.log(argv);
  const { type, endpoint, name, async } = argv;
  const actionType = camelToSnakeCase(type || name).toUpperCase();
  const exportLine = `export { default as ${name} } from './${name}'; ${os.EOL}`;
  const config = { name, actionType, endpoint, async };

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
  fs.writeFile(`${actionsFolder}/${name}.js`, actionBody(config), fsCallback);
  // create import of comp in index file
  fs.appendFile(`${actionsFolder}/index.js`, exportLine, fsCallback)
}
/*

api actions cases:
params:
 get,
 put,
 patch,
 delete
body:
 post,
 put,
 patch
*/