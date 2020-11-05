import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from "mongoose"
import * as mongoose from "mongoose"
import { ProfileSchema } from "src/profile/profile.schema";

@Schema()
export class Post extends Document{
    @Prop()
    projectTitle

    @Prop()
    projectDescription

    @Prop()
    projectImage
    
    @Prop()
    projectUrl

    @Prop()
    projectSkills

    @Prop()
    @Prop({type:Number,default:0,min:0})
    likes

    @Prop({type:Date,default:Date.now()})
    projectCreatedDate

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Profile"})
    profile
}

export const PostSchema=SchemaFactory.createForClass(Post)


