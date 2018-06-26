import winston = require('winston');
import fs = require('fs');

enum ConfigOptions {
    Console = 1,
    File,
    Exception
}

export class Logger {
    private static loggerInstance: winston.Logger;
    private static env = process.env.NODE_ENV || 'development';
    private static logDir = 'log';
    private static tsFormat = () => (new Date()).toLocaleTimeString();

    constructor() {
    }

    static Init(): void {
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
        })
    }
    static get logger(): winston.Logger {
        return this.loggerInstance;
    }
    private static configOptions(config: ConfigOptions): any {
        let commonConfig = {
            timestamp: Logger.tsFormat,
            level: 'info',
            handleExceptions: true
        };
        let additionalConfig = {
            filename: `${Logger.logDir}/-results.log`,
            datePattern: 'yyyy-MM-dd',
            prepend: true
        }
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
Logger.Init();