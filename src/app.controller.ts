import { Controller, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(@Body() body): Promise<any> {
    if (!body?.url) {
      return 'Something wend wrong';
    }

    return await this.appService.getHtmlByUrl(body.url);
  }
}
