const Config = require("../api.config");
const fs = require("fs");
const path = require("path");

describe("Config", () => {

    // Variables
    const configDir = path.join(__dirname, "../config"); // -- config directory
    const allowedExtension = ".config.js"; // -- file allowed extension

    // Files
    const configFiles = fs.readdirSync(configDir);
    const configProperties = Object.keys(Config);

    // Tests
    test("should be defined", () => {
        expect(Config).toBeDefined();
    });

    test("should load a file for each config key", () => {
        expect(configFiles.length).toBe(configProperties.length);
    });
  
    test("should naming the config properties same as file names without [.config.js]", () => {

        configFiles.forEach((fileName, index) => {
            const configName = fileName.replace(allowedExtension, "");
            // console.log(`Comparing [${configName}] with [${configProperties[index]}]`);
            expect(configName).toBe(configProperties[index]);
        });
    });
});
