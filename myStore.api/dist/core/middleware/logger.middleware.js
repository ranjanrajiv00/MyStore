"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const fs = require("fs");
var ConfigOptions;
(function (ConfigOptions) {
    ConfigOptions[ConfigOptions["Console"] = 1] = "Console";
    ConfigOptions[ConfigOptions["File"] = 2] = "File";
    ConfigOptions[ConfigOptions["Exception"] = 3] = "Exception";
})(ConfigOptions || (ConfigOptions = {}));
class Logger {
    constructor() {
    }
    static Init() {
        if (!fs.existsSync(Logger.logDir)) {
            fs.mkdirSync(Logger.logDir);
        }
        const transports = {
            console: new (winston.transports.Console)(Logger.configOptions(ConfigOptions.Console)),
            file: new (require('winston-daily-rotate-file'))(Logger.configOptions(ConfigOptions.File)),
            exception: new (require('winston-daily-rotate-file'))(Logger.configOptions(ConfigOptions.Exception))
        };
        this.loggerInstance = new (winston.Logger)({
            transports: [
                transports.console,
                transports.file
            ],
            exceptionHandlers: [
                transports.exception
            ]
        });
    }
    static get logger() {
        return this.loggerInstance;
    }
    static configOptions(config) {
        let commonConfig = {
            timestamp: Logger.tsFormat,
            level: 'info',
            handleExceptions: true
        };
        let additionalConfig = {
            filename: `${Logger.logDir}/-results.log`,
            datePattern: 'yyyy-MM-dd',
            prepend: true
        };
        if (config == ConfigOptions.Console) {
            return Object.assign({}, commonConfig, {
                colorize: true
            });
        }
        else if (config == ConfigOptions.File) {
            commonConfig.level = Logger.env === 'development' ? 'verbose' : 'info';
            additionalConfig.filename = `${Logger.logDir}/-results.log`;
            return Object.assign({}, commonConfig, additionalConfig);
        }
        else if (config == ConfigOptions.Exception) {
            commonConfig.level = Logger.env === 'development' ? 'verbose' : 'info';
            additionalConfig.filename = `${Logger.logDir}/-exception.log`;
            return Object.assign({}, commonConfig, additionalConfig, {
                humanReadableUnhandledException: true
            });
        }
    }
}
Logger.env = process.env.NODE_ENV || 'development';
Logger.logDir = 'log';
Logger.tsFormat = () => (new Date()).toLocaleTimeString();
exports.Logger = Logger;
Logger.Init();
//# sourceMappingURL=logger.middleware.js.map