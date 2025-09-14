import { Page } from 'puppeteer';

interface Props {
  page: Page;
  selector: string;
}

export default async function elementIsVisible({ page, selector }: Props) {
  return await page.evaluate(selector => {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) return false;
    const style = window.getComputedStyle(element);
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      style.opacity !== '0' &&
      element.offsetWidth > 0 &&
      element.offsetHeight > 0
    );
  }, selector);
}
