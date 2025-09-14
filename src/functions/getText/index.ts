import { Page } from 'puppeteer';

export default async function getText(page: Page, selector: string) {
  try {
    return await page.$eval(selector, el => el.textContent?.trim() ?? '');
  } catch {
    return '';
  }
}
