import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  Req,
  Request,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AppService, CatsService } from './app.service';
import { CatsDto } from './dto/cats.dto';
import { map, catchError } from 'rxjs';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { getHtmlByUrl } from './utils/getHtmlByUrl';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('cats')
export class CatsController {
  constructor(private http: HttpService) {}

  @Get()
  async getSomeThing(@Body() body) {
    const url = body?.url;

    if (!url) {
      return 'Something wend wrong';
    }

    const html = await getHtmlByUrl(url);

    return html;
  }
}

// { attribute: string, className: string, id: string, href: string }
