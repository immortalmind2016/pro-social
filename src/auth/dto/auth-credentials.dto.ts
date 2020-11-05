import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthCredentailsDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password



}