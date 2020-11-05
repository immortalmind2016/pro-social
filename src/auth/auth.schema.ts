import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
import * as bcrypt from "bcrypt"



export const UserSchema=new mongoose.Schema({
    email:{type:String,unique:true},
    password:String,
    salt:String,
    name:String
})
UserSchema.methods.validatePassword=async function (password:string):Promise<Boolean>{

    const hashed=await bcrypt.hash(password,this.salt);
  
    return hashed==this.password
   

}
