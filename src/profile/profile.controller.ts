import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { DeleteEduExpDto } from './dto/delete-eduexp.dto';

import { Experience } from './profile.interfaces';
import { ProfileSchema } from './profile.schema';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from "multer"


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("FILE ")
   

        
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })

@ApiBearerAuth()
@ApiTags("Profile")
@Controller('profile')
export class ProfileController {
    constructor(
        private profileService:ProfileService

    ) {
        
        
    }


   //intercepters have access to reponse/requurest before and after router hanlder called
  //Filters after Router hander and after Interecpter , last stage before respsonse go out
    @Post("/")
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor("profilePic"))
    @UsePipes(ValidationPipe)   
    async createProfile(@Body() profileDto:CreateProfileDto,@GetUser() user,@UploadedFile() file):Promise<Object>{
  
    const profile = await this.profileService.createProfile(profileDto,user,file);
    return profile;
    }
    @Patch("/:id")
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor("profilePic"))

    async updateProfile(@Param("id") id:String,@Body() updateProfileDto:UpdateProfileDto,@GetUser() user,@UploadedFile() file):Promise<Object>{
   
      return this.profileService.updateProfile(id,updateProfileDto,user,file)
        
    }
    @Delete("/:id")
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    async removeEduExp(@Param("id") id:String,@Body() deleteEduExpDto:DeleteEduExpDto,@GetUser() user){
        this.profileService.removeEduExp(id,deleteEduExpDto,user)
    }
    @Get("/")
    @UseGuards(AuthGuard())
    async getProfile(@GetUser() user){
    
        return this.profileService.getProfile(user._id)
    }
    @Get("/:profileId")

    async getProfileById(@Param("profileId") profileId){
    
        return this.profileService.getProfileById(profileId);
    }

}
