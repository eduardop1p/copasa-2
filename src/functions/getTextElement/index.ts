import { ElementHandle, Page } from 'puppeteer';

export default async function getTextElement(
  page: Page,
  element: ElementHandle<HTMLSpanElement>
) {
  try {
    return await page.evaluate(element => element.innerText.trim(), element);
  } catch {
    return '';
  }
}
