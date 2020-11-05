import { IsArray, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from "mongoose"
@Schema()
export class Education {

    @Prop()
    @ApiProperty()
    @IsNotEmpty()
    unversity:String
    @Prop()
    @ApiProperty()
    @IsNotEmpty()
    faculty:String
    @Prop()
    @ApiProperty()
    @IsNotEmpty()
    department:String
    @Prop()
    @ApiProperty()
    @IsNotEmpty()
    start:Date
    @Prop()
    @IsNotEmpty()
    @ApiProperty()
    end:Date
}

@Schema()
export class Experience { 
  
        @Prop()
        @ApiProperty()
        title:String

        @Prop()
        @ApiProperty()
        start:Date

        @Prop()
        @ApiProperty()
        end:Date

        @Prop()
        @ApiProperty()
        city:String

        @Prop()
        @ApiProperty()
        @Prop()
        company:String
     
 
}
export const EducationSchema = SchemaFactory.createForClass(Education);
export const ExperienceSchema = SchemaFactory.createForClass(Experience);
