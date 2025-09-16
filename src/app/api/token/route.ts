export const maxDuration = 300;

import { headers as nextHeaders } from 'next/headers';
import { userAgent as userAgentNext } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';

import { get } from 'lodash';

import createUser from '@/db/actions/user/createUser';
import ScrapeError from '@/errors/scrapeError';
import UserProtocol from '@/interfaces/userProtocol';
import keysToLowerCase from '@/services/keysToLowerCase';
import parseCurrencyFloat from '@/services/parseCurrencyFloat';
import validationCPF from '@/services/validationCPF';

interface BodyParams {
  idDocument?: string;
  password?: string;
  contactid?: string;
  token?: string;
  userSID?: string;
  aspNetCoreMvcCookieTempDataProvider?: string;
  copasaPortalSession?: string;
  ARRAffinity?: string;
  ARRAffinitySameSite?: string;
  aiUser?: string;
  aiSession?: string;
}

export async function POST(req: NextRequest) {
  const headers = await nextHeaders();
  const realUserAgent = userAgentNext({ headers }).ua;

  try {
    const {
      password,
      idDocument,
      contactid,
      token,
      userSID,
      aspNetCoreMvcCookieTempDataProvider,
      copasaPortalSession,
      ARRAffinity,
      ARRAffinitySameSite,
      aiUser,
      aiSession,
    }: BodyParams = await req.json();
    if (
      !idDocument ||
      !password ||
      !contactid ||
      !token ||
      !userSID ||
      !aspNetCoreMvcCookieTempDataProvider ||
      !copasaPortalSession ||
      !ARRAffinity ||
      !ARRAffinitySameSite ||
      !aiUser ||
      !aiSession
    ) {
      throw new ScrapeError('Parâmetros de requisição inválidos', 401);
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

    const bodyToken = new URLSearchParams({
      ax4b_token: token,
      contactid,
      url: 'https://copasaproddyn365api.azurewebsites.net',
      userSID,
    });

    const resToken = await fetch(
      'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Login/TokenValidate',
      {
        method: 'post',
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'user-agent': realUserAgent,
          'x-requested-with': 'XMLHttpRequest',
          cookie: `.AspNetCore.Mvc.CookieTempDataProvider=${aspNetCoreMvcCookieTempDataProvider}; Copasa.Portal.Session=${copasaPortalSession}; ARRAffinity=${ARRAffinity}; ARRAffinitySameSite=${ARRAffinitySameSite}; ai_user=${aiUser}; ai_session=${aiSession}`,
        },
        body: bodyToken,
      }
    );
    let dataToken = await resToken.json();
    dataToken = keysToLowerCase(dataToken);

    if (!resToken.ok || get(dataToken, 'message', false)) {
      throw new ScrapeError(dataToken.message, 401);
    }
    if (typeof dataToken === 'string') dataToken = JSON.parse(dataToken);

    const bodyIdentifiers = new URLSearchParams({
      CpfCnpj: validationCPF(idDocument)
        ? handleChangeCPF(idDocument)
        : handleChangeCNPJ(idDocument),
      Contatoid: contactid,
      url: 'https://copasaproddyn365api.azurewebsites.net',
      userSID,
    });

    const fetchIdentifiers = await fetch(
      'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Services/MyAccount_ListIdentifiers_GetIdentifiers',
      {
        method: 'post',
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'user-agent': realUserAgent,
          'x-requested-with': 'XMLHttpRequest',
          cookie: `.AspNetCore.Mvc.CookieTempDataProvider=${aspNetCoreMvcCookieTempDataProvider}; Copasa.Portal.Session=${copasaPortalSession}; ARRAffinity=${ARRAffinity}; ARRAffinitySameSite=${ARRAffinitySameSite}; ai_user=${aiUser}; ai_session=${aiSession}`,
        },
        body: bodyIdentifiers,
      }
    );
    let dataIdentifiers = await fetchIdentifiers.json();
    console.log('----------identificadores----------');
    console.log(dataIdentifiers);

    dataIdentifiers = dataIdentifiers
      .map((item: any) => {
        return item.copasa_contact_copasa_controledeidentificador.map(
          (_item: any) => ({
            contactId: _item._copasa_contatoid_value,
            identifier: _item.copasa_controledeidentificadorid,
          })
        );
      })
      .flat();

    let data: Omit<UserProtocol, '_id' | 'createdIn'> = {
      idDocument,
      password,
      name: dataToken.fullname,
      email: dataToken.emailaddress1,
      phone: dataToken.mobilephone.replace(/[^\d]+/g, ''),
      installations: [],
    };

    let installations = dataIdentifiers.map(async (item: any) => {
      const bodyRegistrations = new URLSearchParams({
        CpfCnpj: validationCPF(idDocument)
          ? handleChangeCPF(idDocument)
          : handleChangeCNPJ(idDocument),
        idCpfCnpj: item.contactId,
        Origem: 'WEB',
        Identifier: item.identifier,
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
      const dataRegistrations = await resRegistrations.json();
      console.log('----------Registros----------');
      console.log(dataRegistrations);

      return dataRegistrations.matriculas.map((_item: any) => ({
        contactId: item.contactId,
        identifier: _item.identificador,
        registration: _item.matricula,
        location: _item.Localidade,
        neighborhood: _item.bairro,
        publicPlace: _item.logradouro,
        streetnumber: _item.numeroLogradouro,
        streetComplementType: _item.tipoComplementoLogradouro,
        publicPlaceAddOn: _item.complementoLogradouro,
        CPFCNPJ: _item.cpfCnpj,
        name: _item.nome,
        dateStartValidity: _item.dataInicioVigencia,
        situation: _item.situacao,
      }));
    });
    installations = (await Promise.all(installations)).flat();

    installations = installations.map(async (item: any) => {
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
    data.installations = installations;
    const userId = await createUser(data);

    return NextResponse.json({
      success: true,
      userId,
      installationId: data.installations[0].identifier,
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
    // await browser.close();
  }
}
