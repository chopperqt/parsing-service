import { Controller, Get } from '@nestjs/common';
import { CatsService } from './app.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getMyCat(): string {
    return this.catsService.getMyCat();
  }
}
