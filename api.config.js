const fs = require("fs");
const path = require("path");

class Config {
  constructor() {
    this.buildConfigurations();
  }

  buildConfigurations() {
    const configDirPath = path.join(__dirname, "config");
    const allowedExtension = ".config.js"; // Only load config.js files

    // Read all files from /config path
    fs.readdirSync(configDirPath).forEach((file) => {
      // Just load .js files
      if (file.endsWith(".js")) {

        // Get the name of the file without extension
        const configName = file.replace(allowedExtension, "");

        // Import file as module
        const configModule = require(path.join(configDirPath, file));

        // Asign the exported object from file as class property with clear name
        this[configName] = configModule;
        // -- console.log(`Config ${configName} loaded`);
      }
    });
  }
}

module.exports = new Config();