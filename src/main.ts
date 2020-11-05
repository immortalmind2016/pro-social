
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import * as winston from "winston"
import {AppLogger} from "./logger"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()

  .setTitle('Social Application')
  .setDescription('this APIs for Social web application based on Nestjs (e.g. CRUD for posts)')
  .setVersion('1.0')
  .build();

const appLogger=AppLogger
const logger=appLogger.getInstance()
const port=3000
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);
app.enableCors()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(join(process.cwd(), '/uploads_img/')));
await app.listen(port);
logger.log({ level: 'info',message:`Application was start on port ${port}`,date:appLogger.getNowDate()})
process.on("SIGUSR1",()=>{
  logger.log({ level: 'info',message:`Application was restarted`,date:appLogger.getNowDate()})

})
process.on("SIGUSR2",()=>{
  logger.log({ level: 'info',message:`Application was started `,date:appLogger.getNowDate()})
})
process.on("SIGINT",()=>{
  console.log("WWWWWWWWWWW")
  logger.log({ level: 'info',message:`Application was stopped by CTR+C `,date:appLogger.getNowDate()})
  process.exit()
})



}

bootstrap();


