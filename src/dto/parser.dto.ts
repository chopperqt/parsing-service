import { IsNotEmpty } from 'class-validator';

export interface Option {
  selector: string;
  key: string;
  attr?: string;
  find?: string;
  isText?: boolean;
}
export class ParserDto {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  options: Option[];

  shouldSaveScreenshot?: boolean;
}
