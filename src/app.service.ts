import axios from 'axios';
import { Injectable } from '@nestjs/common';

const CATCH_ERROR_TEXT = 'API not available';

@Injectable()
export class AppService {
  async getHtmlByUrl(url: string) {
    return await axios
      .get(url)
      .then((res) => res.data)
      .catch(() => CATCH_ERROR_TEXT);
  }
}
