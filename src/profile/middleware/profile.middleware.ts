import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class ProfileMiddleWare implements NestMiddleware{
        
        use(req:Request
            ,rest:Response,
            next:Function){
                console.log(req.body, " MIDDLE WARE ")
                next();
        }
}