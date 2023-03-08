import axios from 'axios';
import puppeteer from 'puppeteer';
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

  async getPdf(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const screenshot = await page.screenshot({
      type: 'jpeg',
      fullPage: true,
    });

    browser.close();

    return screenshot;
  }
}
