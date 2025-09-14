export const maxDuration = 300;

import { headers as nextHeaders } from 'next/headers';
import { userAgent as userAgentNext } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';

import decryptData from '@/actions/decryptData';
import puppeteerConfig from '@/config/puppeteerConfig';
import ScrapeError from '@/errors/scrapeError';
import delay from '@/services/delay';
import keysToLowerCase from '@/services/keysToLowerCase';

interface BodyParams {
  document?: string;
  password?: string;
}

export async function POST(req: NextRequest) {
  const headers = await nextHeaders();
  const realUserAgent = userAgentNext({ headers }).ua;
  const { page, browser } = await puppeteerConfig({ userAgent: realUserAgent });

  try {
    const authorization = req.headers.get('authorization') ?? '';
    const isAuthorized = await decryptData(authorization);
    if (!isAuthorized) {
      throw new ScrapeError('Você não tem esse poder comédia', 401);
    }

    const body: BodyParams = await req.json();
    let idDocument = body.document;
    let password = body.password;

    if (!idDocument || !password) {
      throw new ScrapeError('Parâmetros de requisição inválidos', 401);
    }
    idDocument = idDocument.replace(/[^\d]+/g, '');
    console.warn(body);

    await page.goto(
      'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Home/index',
      {
        waitUntil: 'domcontentloaded',
      }
    );
    await delay(1000);
    await page.evaluate(() => {
      window.btnOnclickCopasa();
    });
    async function watchUserSID() {
      const start = Date.now();
      const maxTime = 20000;
      const interval = 1000;

      while (true) {
        const data = await page.evaluate(() => {
          return sessionStorage.getItem('userSID');
        });
        if (data) {
          return data; // encerra a função se encontrou
        }
        // se passou do tempo máximo, encerra retornando null
        if (Date.now() - start > maxTime) {
          return null;
        }
        // espera antes de checar de novo
        await new Promise(res => setTimeout(res, interval));
      }
    }
    const userSID = await watchUserSID();
    await delay(2000);
    if (!userSID) {
      throw new ScrapeError('Ocorreu um erro, por favor tente novamente', 401);
    }

    const bodyLogin = new URLSearchParams({
      username: '',
      password: '',
      adxusername: idDocument,
      adxpassword: password,
      url: 'https://copasaproddyn365api.azurewebsites.net',
      userSID,
    });
    const cookies = await browser.cookies();
    const aspNetCoreMvcCookieTempDataProvider = cookies.find(
      item => item.name === '.AspNetCore.Mvc.CookieTempDataProvider'
    )?.value;
    const copasaPortalSession = cookies.find(
      item => item.name === 'Copasa.Portal.Session'
    )?.value;
    const ARRAffinity = cookies.find(
      item => item.name === 'ARRAffinity'
    )?.value;
    const ARRAffinitySameSite = cookies.find(
      item => item.name === 'ARRAffinitySameSite'
    )?.value;
    const aiUser = cookies.find(item => item.name === 'ai_user')?.value;
    const aiSession = cookies.find(item => item.name === 'ai_session')?.value;

    const resLogin = await fetch(
      'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Login/EncryptLogin',
      {
        method: 'post',
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'user-agent': realUserAgent,
          'x-requested-with': 'XMLHttpRequest',
          cookie: `.AspNetCore.Mvc.CookieTempDataProvider=${aspNetCoreMvcCookieTempDataProvider}; Copasa.Portal.Session=${copasaPortalSession}; ARRAffinity=${ARRAffinity}; ARRAffinitySameSite=${ARRAffinitySameSite}; ai_user=${aiUser}; ai_session=${aiSession}`,
        },
        body: bodyLogin,
      }
    );
    let dataLogin = await resLogin.json();
    dataLogin = keysToLowerCase(dataLogin);
    if (
      !resLogin.ok ||
      dataLogin.status === 500 ||
      dataLogin.message.toLowerCase() === 'usuário/senha incorreta.'
    ) {
      throw new ScrapeError(
        'Ocorreu um erro, revise CPF ou SENHA para tentar novamente.',
        401
      );
    }
    const contactid = dataLogin.id;

    return NextResponse.json({
      success: true,
      idDocument,
      password,
      contactid,
      userSID,
      aspNetCoreMvcCookieTempDataProvider,
      copasaPortalSession,
      ARRAffinity,
      ARRAffinitySameSite,
      aiUser,
      aiSession,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof ScrapeError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: err.message,
          },
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: {
          message: 'Erro ao fazer a consulta',
        },
      },
      { status: 400 }
    );
  } finally {
    await browser.close();
  }
}
