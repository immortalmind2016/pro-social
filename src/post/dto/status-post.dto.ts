import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";

export enum STATUS_LIKE {
    LIKE,
    DISLIKE
}
export class StatusPostDto{
    @ApiProperty({enum:STATUS_LIKE})
    type:String


}