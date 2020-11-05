import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";

export class UpdatePostDto{
    @ApiProperty()
    projectTitle:String

    @ApiProperty()
    projectDescription:String

    @ApiProperty()
   
    projectImage:String
    
    @ApiProperty()
    @IsUrl()
    projectUrl:String

    @ApiProperty()
    projectSkills:String

    @ApiProperty()
    projectCreatedDate:Date


}