import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { StatusPostDto, STATUS_LIKE } from './dto/status-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
@ApiTags("post")

@Controller('post')
export class PostController {
    constructor(
        private postService:PostService
    ){}
    @ApiBearerAuth()
    @Post("/")
    @UseGuards(AuthGuard())

    @UseInterceptors(FileInterceptor("projectImage",{limits:{ fieldSize: 25 * 1024 * 1024 }}))
    @UsePipes(ValidationPipe)
    async createPost(@Body() createPostDto:CreatePostDto,@GetUser() user,@UploadedFile() file){
        console.log("FILE ",file)
        return this.postService.createPost(createPostDto,user,file);
    }
    @ApiBearerAuth()
    @Patch("/:id")
    @UseGuards(AuthGuard())
    async updatePost(@Body() updatePostDto:UpdatePostDto,@GetUser() user,@Param("id") id:String){
        return this.postService.updatePost(id,updatePostDto,user);
    }
    @ApiBearerAuth()
    @Delete("/:id")
    @UseGuards(AuthGuard())
    async deletePost(@Param("id") id:String,@GetUser() user){
        return this.postService.deletePost(id,user);
    }

    @Patch("/:id/like")
    async likePost(@Param("id") id:String,@Body() statusPostDto:StatusPostDto){
        console.log(statusPostDto , "TYPE")
        this.postService.likePost(id,statusPostDto)
    }

    @UseGuards(AuthGuard())
    @Get("/:page")
    getMePosts(@GetUser() user,@Param("page") page)
    {
        return this.postService.getMePosts(user,page)
    }
    
    @Get("/:id/:page")
    getPosts(@Param("page") page,@Param("id") id)
    {  
        return this.postService.getPosts(id,page)
    }

}
