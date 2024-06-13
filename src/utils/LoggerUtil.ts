import { createLogger, format, transports } from 'winston';
import moment from 'moment-timezone';
import path from 'path';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: () => {
        return moment().tz('Asia/Dubai').format();
      }
    }),
    format.simple()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logfile.log' }),
  ]
});

export default logger;
