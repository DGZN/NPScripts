import inquirer from "inquirer";
import npm from "npm";

class NPMScripts {
  all() {
    this.scripts = require("./package.json").scripts;
    return Object.keys(this.scripts);
  }

  async run(script) {
    npm.load(() => {
      npm.run(script);
    });
  }
}

let scripts = new NPMScripts();

inquirer
  .prompt([
    {
      type: "list",
      name: "script",
      message: "Which script would you like to run?",
      choices: scripts.all(),
    },
  ])
  .then((answers) => {
    scripts.run(answers.script);
  });
