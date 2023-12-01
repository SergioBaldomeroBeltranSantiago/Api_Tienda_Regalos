const winston = require("winston");

const registerError = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json({
      replacer: (key, value) => {
        if (value instanceof Error) {
          return {
            name: value.name,
            code: value.code,
            message: value.message,
            stack: value.stack,
            path: value.path,
            method: value.method,
            statusCode: value.statusCode,
            requestBody: value.requestBody,
            user: value.user,
          };
        }
        return value;
      },
    }),
  ),
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      options: { flags: "a" },
    }),
  ],
});

const errorHandler = (error, req, res, next) => {
  registerError.error(error);
  if (res) res.sendStatus(500);
};

module.exports = errorHandler;
