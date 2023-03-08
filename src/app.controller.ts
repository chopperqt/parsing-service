import {
  Controller,
  Get,
  Body,
  Res,
  StreamableFile,
  Response,
} from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as fs from 'node:fs';
import { createReadStream } from 'node:fs';
import path from 'node:path';

import { AppService } from './app.service';
import { ParserDto } from './dto/parser.dto';

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

    if (body.shouldSaveScreenshot) {
      const screenshot = await this.appService.getPdf(body.url);

      //data['screenshot'] = screenshot;
      res.set({
        'Content-Type': 'image/jpeg',
      });

      return new StreamableFile(screenshot);
    }

    return data;
  }
}
