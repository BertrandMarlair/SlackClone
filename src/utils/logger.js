import {createLogger, transports, format} from "winston";
import {DateTime} from "luxon";

const DATE_FORMAT = "yyyy/LL/dd TT.SSS";

const logger = createLogger({
    level: "info",
    format: format.json(),
    defaultMeta: {
        service: "user-service",
    },
    transports: [
        /*
         *
         * - Write to all logs with level `info` and below to `combined.log`
         * - Write all logs error (and below) to `error.log`.
         *
         */
        new transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
        new transports.File({
            filename: "logs/combined.log",
        }),
        new transports.Console({
            level: "debug",
            format: format.printf(
                ({level, message}) =>
                    `${DateTime.local().toFormat(
                        DATE_FORMAT,
                    )} |${level}| ${message}`,
            ),
        }),
    ],
});

export const error = logger.error ? logger.error.bind(logger) : logger.error;
export const warn = logger.warn ? logger.warn.bind(logger) : logger.warn;
export const info = logger.info ? logger.info.bind(logger) : logger.info;
export const verbose = logger.verbose
    ? logger.verbose.bind(logger)
    : logger.verbose;
export const debug = logger.debug ? logger.debug.bind(logger) : logger.debug;
export const silly = logger.silly ? logger.silly.bind(logger) : logger.silly;
export const log = logger.debug ? logger.debug.bind(logger) : logger.debug;

export default {
    error,
    warn,
    info,
    verbose,
    debug,
    silly,
    log,
};
