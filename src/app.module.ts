import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ProfileMiddleWare } from './profile/middleware/profile.middleware';
import { AppController } from './app/app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  controllers:[AppController],
  imports: [ProfileModule,MongooseModule.forRoot('mongodb://immortalmind:0115120323a@ds259787.mlab.com:59787/social'), PostModule, AuthModule,
 
],
 
})
export class AppModule {
 
}
