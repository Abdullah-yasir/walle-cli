export const dirStructure = [
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
  './src/frontend/screens'
];

const struct = {
  src: {
    frontend: {
      screens: 'index',
      components: 'index',
      routes: 'index'
    },
    backend: {
      store: {
        reducers: 'index',
        actions: 'index',
        index: 'index'
      },
      models: 'index',
      functions: 'index',
      constants: ['actionTypes', 'status', 'colors', 'messages', 'others', 'index']
    }
  }
}

