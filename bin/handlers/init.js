const fs = require('fs');
const { spawn } = require('child_process');
const { PROJECT_CLONE_SOURCE } = require('../constants');

module.exports = (argv) => {
  const { projectName } = argv;

  const cloneProject = spawn('git', ['clone', PROJECT_CLONE_SOURCE, projectName])

  cloneProject.stdout.on("data", data => {
    console.log(`status: ${data}`);
  });

  cloneProject.stderr.on("data", data => {
    console.log(`status: ${data}`);
  });

  cloneProject.on('error', (error) => {
    console.log(`error: ${error.message}`);
  });

  cloneProject.on("close", code => {
    if (code === 0) {
      console.log(`Created new project ${projectName}`);
      console.log(`Navigate into project folder by typing:`);
      console.log(`> cd ${projectName}`);
      return;
    }
    console.log(`child process exited with code ${code}`);
  });
}