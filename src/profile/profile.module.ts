import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileMiddleWare } from './middleware/profile.middleware';
import * as formidable from "express-formidable"


import { ProfileController } from './profile.controller';
import { Education, EducationSchema, Experience, ExperienceSchema } from './profile.interfaces';
import {  ProfileSchema } from './profile.schema';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports:[MongooseModule.forFeature([{name:"Profile",schema:ProfileSchema}]),AuthModule]
})
export class ProfileModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(ProfileMiddleWare).forRoutes({path:"profile/",method:RequestMethod.POST})
  }

}
