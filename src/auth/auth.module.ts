import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {UserSchema} from "./auth.schema"
import { JwtStrategy } from './jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
@Module({
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  imports:[
    MongooseModule.forFeature([{name:"User",schema:UserSchema}]),
    PassportModule.register({defaultStrategy:"jwt"}),
    JwtModule.register({
    
        secret:"mohamed",
        signOptions:{
          expiresIn:24*3600, //seconds
        }
      
    }),
  

],
exports:[
  JwtStrategy,
  PassportModule
]
})
export class AuthModule {}
