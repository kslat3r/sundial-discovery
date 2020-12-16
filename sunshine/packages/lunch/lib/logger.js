const winston = require('winston')

const { LOG_LEVEL } = process.env

module.exports = winston.createLogger({
  level: LOG_LEVEL || 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
})
