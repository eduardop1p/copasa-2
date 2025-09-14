import { Page } from 'puppeteer';

interface Props {
  page: Page;
  selector: string;
}

export default async function elementIsHidden({ page, selector }: Props) {
  return await page.waitForFunction(
    selector => {
      const element = document.querySelector(selector);
      if (!element) return true;
      const style = window.getComputedStyle(element);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        element.clientHeight &&
        element.clientWidth
      );
    },
    { timeout: 30000 },
    selector
  );
}
