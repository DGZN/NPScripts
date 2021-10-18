const fs = require("fs");
const path = require("path");
const ora = require("ora");
const { projectInstallSync } = require("pkg-install");

console.log(path.resolve(__dirname));

class NPScripts {
  
  constructor() {
    if (!fs.existsSync(path.resolve(process.cwd(), "package.json"))) {
      console.error(`No package.json file could be found at ${process.cwd()}`);
      process.exit(0);
    } else {
      this.package = require(path.resolve(process.cwd(), "package.json"));
    }
    if (!this.package || !this.package.hasOwnProperty("scripts")) {
      console.error(`[${this.package.name.toUpperCase()}] does not have any scripts`);
      process.exit(0);
    }
    let { name, description, scripts} = this.package;
    return {
      name,
      scripts,
      description,
      package: this.package,
      dependencies: this.dependencies()
    }
  }

  dependencies () {
    let { dependencies = {}, devDependencies = {} } = this.package;
    let all = Object.assign({}, dependencies, devDependencies);
    let packages = Object.keys(all);
    let installed = fs.existsSync(
      path.resolve(process.cwd(), "node_modules")
    );
    let install = async (shouldInstall) => {
      return new Promise(async (res, rej) => {
        let spinner = ora();
        if (!installed) {
          spinner.start("Installing Dependencies");
          let installDeps = await projectInstallSync({
            verbose: true,
            dev: true,
            prefer: "npm",
            stdio: "inherit",
          })
        }
        res(spinner.succeed());
      })
    }
    return {
      all,
      install,
      packages,
      installed,
    }
  }
}

module.exports = NPScripts;