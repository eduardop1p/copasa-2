export const maxDuration = 300;

import { headers as nextHeaders } from 'next/headers';
import { userAgent as userAgentNext } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';

import decryptData from '@/actions/decryptData';
import puppeteerConfig from '@/config/puppeteerConfig';
import createUser from '@/db/actions/user/createUser';
import ScrapeError from '@/errors/scrapeError';
import UserProtocol from '@/interfaces/userProtocol';
import delay from '@/services/delay';
import keysToLowerCase from '@/services/keysToLowerCase';
import parseCurrencyFloat from '@/services/parseCurrencyFloat';
import validationCPF from '@/services/validationCPF';

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

    const handleFormatDate = (str: string) => {
      try {
        const year = str.slice(0, 4);
        const month = str.slice(4, 6);
        const day = str.length === 8 ? str.slice(6, 8) : '01'; // se não tiver dia, assume 01

        const date = new Date(`${year}-${month}-${day}T00:00:00`);
        return date.toLocaleDateString('pt-BR');
      } catch {
        return new Date().toLocaleDateString('pt-BR', { dateStyle: 'short' });
      }
    };

    const handleChangeCPF = (value: string) => {
      value = value.replace(/[^\d]/g, '');
      value = value.slice(0, 11);
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

      return value;
    };

    const handleChangeCNPJ = (value: string) => {
      value = value.replace(/[^\d]/g, '');
      value = value.slice(0, 14);
      // Aplica a formatação de CNPJ usando regex em etapas
      value = value.replace(/^(\d{2})(\d)/, '$1.$2'); // Formata os dois primeiros dígitos
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Formata os próximos três dígitos
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Formata os próximos três dígitos e adiciona a barra
      value = value.replace(/(\d{4})(\d)/, '$1-$2'); // Formata os quatro dígitos e adiciona o hífen

      return value;
    };

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
      console.log(dataLogin);
      throw new ScrapeError(
        'Ocorreu um erro, revise CPF ou SENHA para tentar novamente.',
        401
      );
    }
    const contactid = dataLogin.id;

    const bodyRegistrations = new URLSearchParams({
      CpfCnpj: validationCPF(idDocument)
        ? handleChangeCPF(idDocument)
        : handleChangeCNPJ(idDocument),
      idCpfCnpj: contactid,
      Origem: 'WEB',
      // Identifier: '',
      Company: 'Copasa',
      url: 'https://copasaproddyn365api.azurewebsites.net',
      userSID,
    });

    const resRegistrations = await fetch(
      'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Services/MyAccount_ListIdentifiers_GetRegistrations',
      {
        method: 'post',
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'user-agent': realUserAgent,
          'x-requested-with': 'XMLHttpRequest',
          cookie: `.AspNetCore.Mvc.CookieTempDataProvider=${aspNetCoreMvcCookieTempDataProvider}; Copasa.Portal.Session=${copasaPortalSession}; ARRAffinity=${ARRAffinity}; ARRAffinitySameSite=${ARRAffinitySameSite}; ai_user=${aiUser}; ai_session=${aiSession}`,
        },
        body: bodyRegistrations,
      }
    );
    let dataRegistrations = await resRegistrations.json();

    try {
      dataRegistrations = dataRegistrations.matriculas.map((item: any) => ({
        contactId: contactid,
        identifier: item.identificador,
        registration: item.matricula,
        location: item.Localidade,
        neighborhood: item.bairro,
        publicPlace: item.logradouro,
        streetnumber: item.numeroLogradouro,
        streetComplementType: item.tipoComplementoLogradouro,
        publicPlaceAddOn: item.complementoLogradouro,
        CPFCNPJ: item.cpfCnpj,
        name: item.nome,
        dateStartValidity: item.dataInicioVigencia,
        situation: item.situacao,
      }));
    } catch {
      console.log(dataRegistrations);
      throw new ScrapeError('Ocorreu um erro por favor tente novamente.', 401);
    }

    let installations = dataRegistrations.map(async (item: any) => {
      const bodyDebts = new URLSearchParams({
        Identifier: item.identifier,
        Registration: item.registration,
        CpfCnpj: validationCPF(idDocument)
          ? handleChangeCPF(idDocument)
          : handleChangeCNPJ(idDocument),
        idCpfCnpj: item.contactId,
        Origem: 'WEB',
        Company: 'Copasa',
        url: 'https://copasaproddyn365api.azurewebsites.net',
        userSID,
        userkey: '',
        hideHeaderFooter: '',
      });

      const resDebts = await fetch(
        'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Services/MyAccount_DuplicateOfAccounts_GetOpenInvoices',
        {
          method: 'post',
          headers: {
            accept: 'application/json, text/javascript, */*; q=0.01',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'user-agent': realUserAgent,
            'x-requested-with': 'XMLHttpRequest',
            cookie: `.AspNetCore.Mvc.CookieTempDataProvider=${aspNetCoreMvcCookieTempDataProvider}; Copasa.Portal.Session=${copasaPortalSession}; ARRAffinity=${ARRAffinity}; ARRAffinitySameSite=${ARRAffinitySameSite}; ai_user=${aiUser}; ai_session=${aiSession}`,
          },
          body: bodyDebts,
        }
      );
      let dataDebts = await resDebts.json();
      return {
        ...item,
        debts: dataDebts.faturas.map((item: any) => ({
          dueDate: handleFormatDate(item.dataVencimento),
          referenceMonth: handleFormatDate(item.referencia),
          status: item.descricaoFatura,
          value: parseCurrencyFloat(item.valorFatura),
        })),
      };
    });
    installations = await Promise.all(installations);
    let data: Omit<UserProtocol, '_id' | 'createdIn'> = {
      idDocument,
      password,
      name: installations.length ? installations[0].name : 'Pagamentos online',
      email: 'copasa@gmail.com',
      phone: '99985329866',
      installations: [],
    };

    data.installations = installations;
    data.installations = data.installations.sort(
      (a, b) => b.debts.length - a.debts.length
    );
    // console.log(data);
    const user = await createUser(data);
    if (!user)
      throw new ScrapeError('Ocorreu um erro, por favor tente novamente', 401);
    const userId = user._id;
    const installationId = user.installations[0]._id;

    return NextResponse.json({
      success: true,
      userId,
      installationId,
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
