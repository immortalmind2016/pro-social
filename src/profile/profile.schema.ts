import { Prop,  SchemaFactory } from "@nestjs/mongoose";
import {Document,Schema} from "mongoose"
import { UserSchema } from "src/auth/auth.schema";
import { Education, Experience, ExperienceSchema} from "./profile.interfaces";
import * as mongoose from "mongoose"

export const ProfileSchema = new mongoose.Schema({
    jobTitle:String,
    experience:{type:[SchemaFactory.createForClass(Experience)],default:[]},
    education:{type:[SchemaFactory.createForClass(Education)],default:[]},
    profilePic:String,
    bio:String,
    created_date:{type:Date,default:Date.now()},
    user:{type:Schema.Types.ObjectId,ref:"User",unique:true},


})
