import { ConflictException, HttpCode, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentailsDto } from './dto/auth-credentials.dto';

import {Model} from "mongoose"
import * as bcrypt from "bcrypt"
import { IsJWT } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { AppLogger } from 'src/logger';
const appLogger=AppLogger
const logger=appLogger.getInstance()
@Injectable()
export class AuthService {

    constructor(
        @InjectModel("User")
        private user:Model
        ,
        
        private jwtService:JwtService
    ){

    }

    async signup(createUserDto:CreateUserDto):Promise<void>{
        const {email,password,name}=createUserDto;
        const salt=await bcrypt.genSalt();
        const user=this.user()
        user.salt=salt
        user.email=email
        user.name=name

        user.password=await this.hashPassword(password,salt)
        
        try{
            await user.save()
        }catch(e){
            
      
        //11000 Code of duplication error
        if(e.code==11000){
            logger.log({ level: 'error',message:`Email :'${email}' is already exist`,date:appLogger.getNowDate()})

            throw new ConflictException("Email already exist!")
        }else
        throw new InternalServerErrorException()
        }
       
       
    }
    async signin(authCredentialsDto:AuthCredentailsDto):Promise<{accessToken:String}>{
        const email=await this.validatePassword(authCredentialsDto);
        if(!email){
            throw new NotFoundException("Invalid Credentials")
        }
        const accessToken=await this.jwtService.sign(authCredentialsDto)
        return {accessToken:`Bearer ${accessToken}`}

        
    }
    async validatePassword(authCredentialsDto:AuthCredentailsDto):Promise<String>{
        const {email,password}=authCredentialsDto
        const user=await this.user.findOne({email})
        if(user&&await user.validatePassword(password)){
            
                return user.email
        }
        else{
                return null
        }

    }


    async hashPassword(password:string,salt:String):Promise<String>{
        return bcrypt.hash(password,salt)

    }




}
