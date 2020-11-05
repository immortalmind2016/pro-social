import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as fs from "fs"
import {ProfileSchema } from './profile.schema';
import {Model,Types} from "mongoose"
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { type } from 'os';
import { DeleteEduExpDto } from './dto/delete-eduexp.dto';
import { ProfileController } from './profile.controller';

@Injectable()
export class ProfileService {
 constructor(
    
    @InjectModel("Profile")
     private profile:Model

 ){
  
 }
 async createProfile(createProfileDto:CreateProfileDto,user,file):Promise<Object>{
    if(!file){
        throw new NotFoundException("please upload your image !")
     }
 
    const {jobTitle,bio,profilePic}=createProfileDto
    const dir="uploads_img/"
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const path_ =dir+file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1]
    try{fs.writeFileSync(path_,file.buffer)}catch(e){throw new InternalServerErrorException()}
    
    const profile=this.profile()

    profile.user=user._id
    profile.jobTitle=jobTitle
    profile.bio=bio
    profile.profilePic="http://localhost:3000/"+path_.replace(dir,"")
    try{
        await profile.save()
    }catch(e){
        console.log(e)
        fs.unlink(path_,(err)=>{})

        if(e.code==11000){
            throw new ConflictException("user profile already exist")
        }
        throw new InternalServerErrorException()
    }
    
    return profile
}
async updateProfile(id:String,updateProfileDto:UpdateProfileDto,user,file):Promise<Object>{
    const {experience,education}=updateProfileDto
    let profilePic=null
    if(file){
        const dir="uploads_img/"
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const path_ =dir+file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1]
        profilePic="http://localhost:3000/"+path_.replace(dir,"")
        try{fs.writeFileSync(path_,file.buffer)}catch(e){throw new InternalServerErrorException()}

    }
  
    
    let profile=await this.profile.findOneAndUpdate({_id:id,user:user._id},{...(file&&{profilePic}),...(experience&&{$addToSet:{experience}}),...(education&&{$push:{education}})},()=>{})  
     fs.unlink(profile.profilePic.replace("http://localhost:3000/"),()=>{})

 
    if(!profile){
        throw new NotFoundException()
    }
    return (experience?profile.experience:profile.education)[0]
}
async removeEduExp(id:String,data:DeleteEduExpDto,user){
    let {type,eduExpId}=data
  
    return this.profile.findOneAndUpdate({_id:id,user:user._id},{...(type&&{$pull:{[type]:{_id:eduExpId}}})},{new:true, upsert : true,    setDefaultsOnInsert: true,
        runValidators: true,},()=>{})  
    
}
async getProfile(userId):Promise<Object>{
    const profile=await this.profile.findOne({user:{_id:Types.ObjectId(userId)}})
    console.log(userId , profile)
    return profile

}

async getProfileById(profileId):Promise<Object>{
    const profile=await this.profile.findOne({_id:profileId})

    return profile

}

}
