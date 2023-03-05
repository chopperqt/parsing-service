import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class CatsService {
  getMyCat(): string {
    return 'My cat name is Masya';
  }
}
