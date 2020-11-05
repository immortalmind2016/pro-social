import { Controller, Get, Res,Response } from '@nestjs/common';

@Controller('app')
export class AppController {

    @Get("*")
        get(@Res() res: Response){
        return "ssss"
        }
}
