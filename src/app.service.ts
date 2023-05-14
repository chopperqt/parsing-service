import axios from 'axios';
import puppeteer from 'puppeteer';
import { Injectable } from '@nestjs/common';

const CATCH_ERROR_TEXT = 'API not available.';

@Injectable()
export class AppService {
  /**
   * Получение HTML страницы, указанного URL
   * @param url - URL страницы
   */
  async getHtmlByUrl(url: string) {
    return await axios
      .get(url)
      .then((res) => res.data)
      .catch(() => CATCH_ERROR_TEXT);
  }

  /**
   * Получение скриншота страницы, указанного URL
   * @param url - URL страницы
   */
  async getScreenshot(url: string) {
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

  /**
   * Получение PDF страницы, указанного URL
   */
  async getPdf(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const pdf = await page.pdf();

    browser.close();

    return pdf;
  }
}
