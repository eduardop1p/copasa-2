/* eslint-disable @typescript-eslint/no-unused-vars */
import puppeteer from 'puppeteer-extra';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import proxys from '../proxys';

interface Params {
  userAgent: string;
}

export default async function puppeteerConfig({ userAgent }: Params) {
  const getRandomProxy = () =>
    proxys[Math.floor(Math.random() * proxys.length)];
  const proxy = `http://${getRandomProxy()}`;

  // const proxy = 'https://gw.dataimpulse.com:823';

  const browser = await puppeteer
    .use(
      RecaptchaPlugin({
        provider: {
          id: '2captcha',
          token: 'ebbd59e0c04ff95a6394bb4df06c971d',
        },
        visualFeedback: true, // enable visual feedback (colorize reCAPTCHAs)
        solveInactiveChallenges: true,
        solveScoreBased: true,
      })
    )
    .use(StealthPlugin())
    .launch({
      headless: true,
      defaultViewport: null,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        // '--mute-audio',
        // `--proxy-server=${proxy}`,
      ],
    });

  const page = await browser.newPage();

  // await page.authenticate({
  //   username: '18b45b183e191d3e4fbc', // Substitua pelo seu nome de usuário DataImpulse.
  //   password: 'f743e01b1543232f', // Substitua pela sua senha DataImpulse.
  // });

  await page.setRequestInterception(true);
  page.on('request', async (request: any) => {
    const blockTypes = [''];
    // const blockTypes = ['stylesheet', 'font', 'image'];
    // const blockTypes = ['image', 'font'];
    if (blockTypes.includes(request.resourceType())) {
      await request.abort();
    } else {
      await request.continue();
    }
  });

  return { browser, page };
}
