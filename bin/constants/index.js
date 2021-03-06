const DIR_STRUCTURE = [
  './src',
  './src/backend',
  './src/backend/store',
  './src/backend/store/actions',
  './src/backend/store/reducers',
  './src/backend/functions',
  './src/backend/models',
  './src/backend/constants',
  './src/frontend',
  './src/frontend/routes',
  './src/frontend/components',
  './src/frontend/screens',
];

const CONFIG_DEFAULTS = {
  directories: {
    constants: './src/backend/constants',
    models: './src/backend/models',
    functions: './src/backend/functions',
    actions: './src/backend/store/actions',
    reducers: './src/backend/store/reducers',
    screens: './src/frontend/screens',
    components: './src/frontend/components',
    routes: './src/frontend/routes',
  },
};

const CONFIG_FILENAME = './walle-cli.json';
const PROJECT_CLONE_SOURCE =
  'https://github.com/Abdullah-yasir/java_assin_11mr21.git';

module.exports = {
  DIR_STRUCTURE,
  CONFIG_FILENAME,
  CONFIG_DEFAULTS,
  PROJECT_CLONE_SOURCE,
};
