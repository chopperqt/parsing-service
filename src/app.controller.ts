import {
  Controller,
  Get,
  Body,
  StreamableFile,
  Response,
} from '@nestjs/common';
import * as cheerio from 'cheerio';

import { AppService } from './app.service';
import { ParserDto, ParserScreenshotDto } from './dto/parser.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(
    @Response({ passthrough: true }) res,
    @Body() body: ParserDto,
  ): Promise<any> {
    const html = await this.appService.getHtmlByUrl(body.url);

    const $ = await cheerio.load(html);

    const data = {};

    body.options.forEach(({ attr, selector, key, isText, find }) => {
      let text = '';
      let parseData: cheerio.Cheerio<cheerio.AnyNode> = $(selector);

      if (find) {
        parseData = parseData.find(find);
      }

      if (attr && !isText) {
        const findText = parseData.attr(attr);

        if (findText) {
          text = findText;
        }
      }

      if (isText && !attr) {
        const findText = parseData.text();

        if (findText) {
          text = findText;
        }
      }

      data[key] = text || '';
    });

    return data;
  }

  @Get(':id')
  async getScreenshot(
    @Response({ passthrough: true }) res,
    @Body() body: ParserScreenshotDto,
  ): Promise<any> {
    const screenshot = await this.appService.getPdf(body.url);

    res.set({
      'Content-Type': 'image/jpeg',
    });

    return new StreamableFile(screenshot);
  }
}
