import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from "mongoose"
import * as mongoose from "mongoose"

import { userInfo } from 'os';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostSchema } from './post.schema';
import { StatusPostDto, STATUS_LIKE } from './dto/status-post.dto';
import * as fs from "fs"

@Injectable()
export class PostService {

    constructor(
      
        @InjectModel(Post.name)
        private post:Model<Post>,
        @InjectModel("Profile")
        private profile:Model

    ){

    }

    async createPost(createPostDto:CreatePostDto,user,file):Promise<Object>{
        if(!file){
            throw new NotFoundException("please upload your image !")
         }
        const {projectTitle,projectDescription,projectImage,projectUrl,projectCreatedDate,projectSkills}=createPostDto
        let post=this.post()
        post.projectTitle=projectTitle;
        post.projectDescription=projectDescription;
        post.projectUrl=projectUrl;
        post.projectCreatedDate=projectCreatedDate;
        post.projectSkills=projectSkills;
        const dir="uploads_img/"
        if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const path_ =dir+file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1]
        try{fs.writeFileSync(path_,file.buffer)}catch(e){throw new InternalServerErrorException()}


        const profile=await this.profile.findOne({user:user._id}).lean();
        post.profile=profile._id
        post.projectImage="http://localhost:3000/"+path_.replace(dir,"")

        try{
            await post.save()
        }catch(e){
            console.log("ERROR ",e)
            throw new InternalServerErrorException()
        }
        return post
        
    }

    async updatePost(id,updatePostDto:UpdatePostDto,user){
    
    let post=await this.post.findOne({_id:id}).populate("profile")

    if(post && String(user._id)==String(post.profile.user)){
        Object.assign(post,updatePostDto)
        post.save()

        return
    }
    throw new NotFoundException()


    }
    async deletePost(id,user){
        let profile=await this.profile.findOne({user:user._id})
        console.log(profile)
        if(profile){
          await this.post.deleteOne({profile:profile._doc._id,_id:id})

        }else
        throw new NotFoundException()
    }
   async likePost(id,statusPostDto:StatusPostDto){
    const {type}=statusPostDto

    await this.post.findOneAndUpdate({_id:id,...{...(type==="DISLIKE")&&{likes:{$gte:1}}}} ,{...(type=="LIKE"?{$inc:{likes:1}} : type=="DISLIKE"&&{$inc:{likes:-1}} )} )
   }
   async getMePosts(user,page){
       const skip=page*5
       const profile=await this.profile.findOne({user:user._id})
       const posts=await this.post.find({profile:profile._doc._id}).sort({"_id":-1}).skip(skip).limit(5)
       return posts
   }

   async getPosts(profileId,page){
    const skip=page*5
    const posts=await this.post.find({profile:profileId}).skip(skip).limit(5)
    return posts
   }

}
