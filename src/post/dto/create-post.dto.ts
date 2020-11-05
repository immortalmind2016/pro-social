import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";

export class CreatePostDto{
    @ApiProperty()
    @IsNotEmpty()
    projectTitle:String

    @ApiProperty()
    @IsNotEmpty()
    projectDescription:String

    @ApiProperty()


    projectImage:String
    
    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    projectUrl:String

    @ApiProperty()
    @IsNotEmpty()
    projectSkills:String

    @ApiProperty()
    projectCreatedDate:Date


}