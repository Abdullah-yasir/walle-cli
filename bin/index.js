#!/usr/bin/env node
const constantHandler = require("./handlers/constant");
const compoentHandler = require("./handlers/component");
const screenHandler = require("./handlers/screen");
const actionHandler = require("./handlers/action");
const modelHandler = require("./handlers/model");
const reducerHandler = require("./handlers/reducer");
const projectInitHandler = require("./handlers/init")

require('yargs/yargs')(process.argv.slice(2))
  .command({
    command: 'consant <key> [value]',
    aliases: ['const'],
    desc: 'create a constant',
    handler: constantHandler
  })
  .command({
    command: 'component <name>',
    aliases: ['comp'],
    desc: 'create a component',
    handler: compoentHandler
  })
  .command({
    command: 'screen <name>',
    aliases: ['scr'],
    desc: 'create a screen',
    handler: screenHandler
  })
  .command({
    command: 'action <name>',
    aliases: ['act'],
    desc: 'create an action',
    handler: actionHandler
  })
  .command({
    command: 'reducer <name>',
    aliases: ['red'],
    desc: 'create a reducer',
    handler: reducerHandler
  })
  .command({
    command: 'model <name>',
    aliases: ['mod'],
    desc: 'create a model',
    handler: modelHandler
  })
  .command({
    command: 'init <project_name>',
    aliases: ['mod'],
    desc: 'create a project',
    handler: projectInitHandler
  })
  .demandCommand()
  .help()
  .wrap(72)
  .argv


