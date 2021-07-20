#!/usr/bin/env node
// const chalk = require("chalk");
// const boxen = require("boxen");

// const greeting = chalk.white.bold("Hello!");

// const boxenOptions = {
//   padding: 1,
//   margin: 1,
//   borderStyle: "round",
//   borderColor: "green",
//   backgroundColor: "#555555"
// };
// const msgBox = boxen(greeting, boxenOptions);

// console.log(msgBox);


const { boolean } = require("yargs");
const yargs = require("yargs");

const options = yargs
  .option("c", { alias: "create", describe: "create", type: boolean, demandOption: true })
  .option("s", { alias: "screen", describe: "create screen file", type: "string" })
  .option("m", { alias: "module", describe: "create new component file", type: "string" })
  .argv;

console.log(options)
if (options.c || options.create) {
  if (options.s || options.screen) {
    console.log('created screen ', options.s);
  }
  else if (options.m || options.module) {
    console.log('created compoent ', options.m);
  }
}

