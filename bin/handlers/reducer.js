const fs = require('fs');
const os = require('os');
const { makeDirRecursive, osPath, camelToSnakeCase } = require('../utils');
const configProvider = require('../utils/configProvider');

// to do create all required constants first
// then put all in import of reducer

const reducerBody = (params) => {
  const { name } = params;
  const reducerName = camelToSnakeCase(name?.replace('reducer', '')).toUpperCase();

  return `
export default ( state = [], action ) => {
  switch(action.type){
    case 'INIT_${reducerName}':
      return action.payload;
    case 'CREATE_${reducerName}':
      return {
        ...state, 
        ...action.payload.map((item)=>{
          return {
            id: item.id?.toString(),
            ...item
          }
        })
      }
    case 'UPDATE_${reducerName}':
      return state.map((item)=>{
        if(item.id === action.payload.id){
          return action.payload;
        }
        return item;
      });
    case 'DELETE_${reducerName}':
      return state.filter((item)=> item.id !== action.payload.id);
    case 'CLEAR_${reducerName}':
      return [];
    default: 
      return state;
  }
}
  `;
};

// get method type from reducer name
// ie get, post, put, patch, delete from getUsers, putUsers, deleteUser

module.exports = (argv) => {
  const { reducers: reducersFolder } = configProvider().directories;
  const reducerName = argv.name;
  const exportLine = `export { default as ${reducerName} } from './${reducerName}'; ${os.EOL}`;
  const config = {
    name: reducerName,
    reducerType: 'reducer_NAME_SNAKE_CASE',
    endpoint: '/',
  };
  const reducerPath = `${reducersFolder}/${reducerName}.reducer.js`;

  const fsCallback = (err) => {
    if (err) console.log(err);
    console.log(`created reducer ${osPath(reducerPath)}`);
  };
  makeDirRecursive(reducersFolder); // create folder if doesn't exist

  // create reducer file
  fs.writeFile(reducerPath, reducerBody(config), fsCallback);
  // create import of comp in index file
  fs.appendFile(`${reducersFolder}/index.js`, exportLine, fsCallback);
};
