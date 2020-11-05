import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema,Post } from './post.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileSchema } from 'src/profile/profile.schema';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


@Module({
  providers: [PostService],
  controllers: [PostController],
  imports:[
    
    MongooseModule.forFeature([{name:Post.name,schema:PostSchema}]),
    MongooseModule.forFeature([{name:"Profile",schema:ProfileSchema}]),
    AuthModule
    
]
})
export class PostModule {}
