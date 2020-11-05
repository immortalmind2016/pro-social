import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, ValidateNested } from "class-validator";
import { Education, Experience } from "../profile.interfaces";

export class UpdateProfileDto {
    @IsOptional()
    @IsNotEmptyObject()
    @ApiProperty({description:"experience",type:Experience})
    @IsObject()
    @ValidateNested({each:true})
    @Type(()=>Experience)
    experience:Experience

    @IsOptional()
    @IsNotEmptyObject()
    @ApiProperty({description:"education",type:Education})
    @IsObject()
    @ValidateNested({each:true})
    @Type(()=>Education)
    education:Education


}