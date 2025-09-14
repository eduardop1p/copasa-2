'use server';

import validationCPF from '@/services/validationCPF';

export default async function getNameDocument(idDocument: string) {
  try {
    const resAuth = await fetch('https://api.deskdata.com.br/auth', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        username: 'mariaribeiro042731@gmail.com',
        password: '04273156aA@',
      }),
    });
    const dataAuth = await resAuth.json();
    const tokenAuth = dataAuth.data.access_token;
    const resData = await fetch('https://api.deskdata.com.br/queries', {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${tokenAuth}`,
      },
      body: JSON.stringify({
        type: validationCPF(idDocument) ? 'persons' : 'companies',
        key_type: validationCPF(idDocument) ? 'cpf' : 'cnpj',
        key_value: idDocument,
        datasets: validationCPF(idDocument) ? ['basic'] : ['addresses'],
      }),
    });
    const data = await resData.json();
    // console.log(data.data.addresses.items[0]);
    return data.data.basic.name.full_name as string;
  } catch (err) {
    console.log(err);
    return null;
  }
}
