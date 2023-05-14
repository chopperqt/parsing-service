import { IsNotEmpty } from 'class-validator';

export interface Option {
  /**
   * Выбриает указанный элемент(ы)
   */
  selector: string;
  /**
   * Ключ в который будут записыватьс
   */
  key: string;
  /**
   * Способ получения атрибутов. Получает значение атрибута только для первого элемента в соответствующем наборе.
   */
  attr?: string;
  /**
   * Поиск все дочерних элементов
   */
  find?: string;
  /**
   * Указывает, что нужно получить, текст выбранного(ых) элементов
   */
  isText?: boolean;
}
export class GetDataDto {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  options: Option[];
}

export class GetFileByUrlDto {
  @IsNotEmpty()
  url: string;
}
