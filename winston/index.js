const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const formattedTimestamp = timestamp({
  format: "YYYY-MM-DD hh:mm:ss Z",
});
const printInfo = (info) => `${info.timestamp} ${info.level}: ${info.message}`;

exports.createLogger = async () => {
  const logger = createLogger({
    format: combine(formattedTimestamp, printf(printInfo)),
    transports: [
      new transports.Console({
        format: combine(
          format.colorize(),
          formattedTimestamp,
          printf(printInfo)
        ),
      }),
      new transports.File({ filename: "error.log", level: "error" }),
      new transports.File({ filename: "all.log" }),
    ],
  });

  return logger;
};
