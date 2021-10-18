const npm = require("npm");
const path = require("path");
const inquirer = require("inquirer");
const NPScripts = require("./lib/NPScripts");

let npscripts = new NPScripts();

const questions = {
  install: {
    type: "list",
    name: "install",
    message:
      "Package dpendencies have not been installed, would you like to install them?",
    choices: ["Yes", "No"],
    when: !npscripts.dependencies.installed
  },
  scripts: {
    type: "list",
    name: "script",
    message: `\n[${npscripts.name}]\n${npscripts.description}\nWhich script would you like to run?`,
    choices: Object.keys(npscripts.scripts)
  },
};

Object.assign(questions.install, {  })

inquirer.prompt(questions.install)
  .then((answers) => {
    return npscripts.dependencies.install();
  })
  .then(() => {
    inquirer.prompt(questions.scripts)
      .then((answers) => {
        return new Promise(() => {
          npm.load(() => {
            try {
              console.log(`[RUNNING::${answers.script}]`);
              npm.run(answers.script);
            } catch (e) {
              console.warn(e);
            }
          });
        });
    });
  });



