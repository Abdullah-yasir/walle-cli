const fs = require('fs');
const os = require('os');
const configProvider = require("../utils/configProvider");
const { reducers: reducersFolder } = configProvider().directories;

// to do create all required constants first
// then put all in import of reducer

const reducerBody = (params) => {
  const { name } = params;
  const strlName = name?.toLowerCase().replace('reducer', '').toUpperCase();

  return `
export default ( state = [], action ) => {
  switch(action.type){
    case 'INIT_${strlName}':
      return action.payload;
    case 'CREATE_${strlName}':
      return {
        ...state, 
        ...action.payload.map((item)=>{
          return {
            id: item.id?.toString(),
            ...item
          }
        })
      }
    case 'UPDATE_${strlName}':
      return state.map((item)=>{
        if(item.id === action.payload.id){
          return action.payload;
        }
        return item;
      });
    case 'DELETE_${strlName}':
      return state.filter((item)=> item.id !== action.payload.id);
    case 'CLEAR_${strlName}':
      return [];
    default: 
      return state;
  }
}
  `
}


// get method type from reducer name
// ie get, post, put, patch, delete from getUsers, putUsers, deleteUser

module.exports = (argv) => {
  const reducerName = argv.name;
  const exportLine = `export { default as ${reducerName} } from './${reducerName}'; ${os.EOL}`;
  const config = { name: reducerName, reducerType: 'reducer_NAME_SNAKE_CASE', endpoint: '/' };
  const fsCallback = (err) => {
    if (err) console.log(err);
    console.log(`created reducer ${argv.name}`);
  }
  // check if reducers folder exists
  // if doesn't try to create new one
  try {
    if (!fs.existsSync(reducersFolder)) {
      fs.mkdirSync(reducersFolder, { recursive: true })
    }
  } catch (err) {
    console.log(`Unable to create ${reducersFolder} folder`);
  }

  // create reducer file
  fs.writeFile(`${reducersFolder}/${reducerName}.js`, reducerBody(config), fsCallback);
  // create import of comp in index file
  fs.appendFile(`${reducersFolder}/index.js`, exportLine, fsCallback)
}