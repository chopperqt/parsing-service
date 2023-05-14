import {
  Controller,
  Get,
  Body,
  StreamableFile,
  Response,
  Header,
} from '@nestjs/common';
import * as cheerio from 'cheerio';

import { AppService } from './app.service';
import { GetDataDto, GetFileByUrlDto } from './dto/parser.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(
    @Response({ passthrough: true })
    @Body()
    { options, url }: GetDataDto,
  ): Promise<unknown> {
    const document = await this.appService.getHtmlByUrl(url);

    const $ = cheerio.load(document);

    const data = {};

    options.forEach(({ attr, selector, key, isText, find }) => {
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

  @Get('/screenshot')
  @Header('Content-Type', 'image/jpeg')
  async getScreenshot(
    @Response({ passthrough: true })
    @Body()
    { url }: GetFileByUrlDto,
  ): Promise<StreamableFile> {
    const screenshot = await this.appService.getScreenshot(url);

    return new StreamableFile(screenshot);
  }

  @Get('/pdf')
  @Header('Content-Type', 'application/pdf')
  async getPdf(
    @Response({ passthrough: true })
    @Body()
    { url }: GetFileByUrlDto,
  ): Promise<any> {
    const pdf = await this.appService.getPdf(url);

    return new StreamableFile(pdf);
  }
}
