const inquirer = require("inquirer");
const npm = require("npm");

let scripts = require(`${process.cwd()}/package.json`).scripts;

inquirer
  .prompt([
    {
      type: "list",
      name: "script",
      message: "Which script would you like to run?",
      choices: Object.keys(scripts),
    },
  ])
  .then((answers) => {
    npm.load(() => {
      npm.run(answers.script);
    });
  });
