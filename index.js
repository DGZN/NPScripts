const npm = require("npm");
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
    choices: Object.keys(npscripts.scripts),
    when: npscripts.scripts && Object.keys(npscripts.scripts),
  },
};

Object.assign(questions.install, {  })

inquirer.prompt(questions.install)
  .then(new Promise((res)=>res(npscripts.dependencies.install())))
  .then(() => {
    return new Promise(() => {
      inquirer.prompt(questions.scripts).then((answers) => {
        npm.load(() => {
          try {
            console.log(`[RUNNING::${answers.script}]`);
            npm.run(answers.script);
          } catch (e) {
            
          }
        });
      });
    });
  });



