import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, isNotEmpty, IsNotEmpty } from "class-validator";
import { type } from "os";

export enum TYPE{
    experience,
    education
}
export class DeleteEduExpDto {
 @IsNotEmpty()
 @IsEnum(TYPE)
 @ApiProperty({enum:TYPE})
 type:TYPE

 @ApiProperty()
 @IsNotEmpty()
 eduExpId:String
}