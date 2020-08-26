const inquirer = require("inquirer");
const npm = require('npm');
const path = require('path');
const fs = require('fs');

let package;

if (!fs.existsSync(path.resolve(process.cwd(), 'package.json'))) {
  console.error(
    `No package.json file could be found at ${process.cwd()}`
  );
  process.exit(0);
} else {
  package = require(path.resolve(process.cwd(), "package.json"));
}

try {
  if (!package || !package.hasOwnProperty("scripts")) {
    console.error(`${package.name} does not have any scripts`);
    process.exit(0);
  }
  inquirer
    .prompt([
      {
        type: "list",
        name: "script",
        message: `\n[${package.name}]\n${
          package.description || ""
        }\nWhich script would you like to run?`,
        choices: Object.keys(package.scripts || [""]),
      },
    ])
    .then((answers) => {
      npm.load(() => {
        npm.run(answers.script);
      });
    });

} catch (e) {
  console.error(e);
  process.exit(1);
}
 

