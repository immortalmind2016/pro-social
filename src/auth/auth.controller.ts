import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentailsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUser } from './get-user.decorator';


class MeResponse{
    @ApiResponseProperty()
    email:String
    @ApiResponseProperty()

    _id:String
}

@ApiTags("Auth")
@Controller('auth')


export class AuthController {
    constructor(
        private authService:AuthService
    ){

    }
    @Post("/signup")
    @UsePipes(ValidationPipe)
    async signup(@Body() createUserDto:CreateUserDto):Promise<void>{
       return this.authService.signup(createUserDto)
     

    }

    @Post("/signin")
    @UsePipes(ValidationPipe)
    async signin(@Body() authCredentailsDto:AuthCredentailsDto):Promise<{accessToken:String}>{
        return this.authService.signin(authCredentailsDto)
    }
    @Get("/test")
    @UseGuards(AuthGuard())
    async test(@GetUser() user){
        return user
    }
    @ApiResponse({type:MeResponse})

    @Get("/me")
    @UseGuards(AuthGuard())
    async get(@GetUser() user){
        delete user.password
        delete user.salt
        return user
    }
}
