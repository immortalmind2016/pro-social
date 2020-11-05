

import * as winston from "winston"
export class AppLogger{
    public static instance: any;


    public static getInstance(){
      if(!AppLogger.instance){
        AppLogger.instance = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'dev-service' },
            transports: [
              //
              // - Write all logs with level `error` and below to `error.log`
              // - Write all logs with level `info` and below to `combined.log`
              //
              new winston.transports.File({ filename: 'error.log', level: 'error' }),
              new winston.transports.File({ filename: 'server.log' }),
            ],
          });
   
    }
    return AppLogger.instance
    }
    
    public static getNowDate(){
      return `${(new Date()).getDay()}-${(new Date()).getMonth()}-${(new Date()).getFullYear()}`
    }
}