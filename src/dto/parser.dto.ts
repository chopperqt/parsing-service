import { IsNotEmpty } from 'class-validator';

type Method = 'text' | 'attr';
export interface Option {
  class: string;
  selector: string;
  key: string;
  method: Method;
}
export class ParserDto {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  options: Option[];
}
