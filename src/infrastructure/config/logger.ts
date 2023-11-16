import winston from 'winston';
import { format } from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.splat()
  ),
  defaultMeta: { service: 'your-service-name' },
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format(info => {
          info.level = ` ${info.level.toUpperCase()} `;
          return info;
        })(),
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
          // Check if the message is an object or an array
          const isObjectOrArray = typeof message === 'object' || Array.isArray(message);
          const logMessage = isObjectOrArray ? JSON.stringify(message, null, 2) : message;

          return `${timestamp} ${level}: ${logMessage}`;
        })
      )
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
    // You can add more transports here if needed
  ]
});

export default logger;
