import { Controller, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';

import { ParserDto } from './dto/parser.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(@Body() body: ParserDto): Promise<any> {
    return await this.appService.getHtmlByUrl(body.url);
  }
}
