import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";

import {Strategy,ExtractJwt} from "passport-jwt"
import { AuthService } from "./auth.service";
import { JwtPayload } from "./jwt.payload.interface";
import {Model} from "mongoose"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel("User")
        private user:Model
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET||"mohamed"
        })
    }


    async validate(payload:JwtPayload){
        const {email}=payload
        const user=await this.user.findOne({email})
        if(!user){
            throw new UnauthorizedException();
        }
        return user._doc
    }
}