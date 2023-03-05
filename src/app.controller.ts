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
  async getHtmlByUrl() {
    const response = await this.http
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    return response;
  }
}

// { attribute: string, className: string, id: string, href: string }
