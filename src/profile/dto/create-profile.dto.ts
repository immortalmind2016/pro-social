import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, isNotEmpty, IsObject, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreateProfileDto{
    @ApiProperty()
    profilePic

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    jobTitle:String

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(80,{message:"write your bio with min length of 80 characters"})
    bio:String





}