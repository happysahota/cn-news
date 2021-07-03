// If something goes unexpectedly wrong winston can help us to figure out by creating regular logs.

import {format, LoggerOptions, transports, createLogger} from "winston";

const options: LoggerOptions = {
    transports: [
        new transports.Console({
          level: process.env.NODE_ENV === "production"? "error" : "debug",
          format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: "debug.log",
            level: "error",
            format: format.combine(format.timestamp(), format.json())
        })
    ]
};

const logger = createLogger(options);

export default logger;