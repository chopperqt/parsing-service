import { IsNotEmpty } from 'class-validator';

export class ParserDto {
  @IsNotEmpty()
  url: string;
}
