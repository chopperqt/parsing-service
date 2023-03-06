import { Controller, Get, Body } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { AppService } from './app.service';

import { ParserDto } from './dto/parser.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(@Body() body: ParserDto): Promise<any> {
    const html = await this.appService.getHtmlByUrl(body.url);

    const $ = await cheerio.load(html);

    const data = {};

    body.options.forEach((item) => {
      data[item.key] = $(`${item.selector} ${item.class}`).text();
    });

    console.log('body: ', body.options);

    return data;
  }
}
