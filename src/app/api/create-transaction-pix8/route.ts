import { NextRequest, NextResponse } from 'next/server';

import TransactionPixProtocol8 from '@/interfaces/transactionPixProtocol8';

interface BodyProps extends TransactionPixProtocol8 {} // eslint-disable-line

export async function POST(req: NextRequest) {
  try {
    let { amount, paymentMethod, customer, items, shipping } =
      (await req.json()) as BodyProps;
    amount = +amount;
    items = items.map(item => ({ ...item, unitPrice: +item.unitPrice, quantity: +item.quantity })); // eslint-disable-line

    const newBody: TransactionPixProtocol8 = {
      amount,
      paymentMethod,
      customer,
      items,
      shipping,
    };

    const resTransaction = await fetch(
      'https://api.assetpagamentos.com/functions/v1/transactions',
      {
        method: 'post',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization:
            'Basic ' +
            Buffer.from(
              `${process.env.ASSET_PAY_SECRET}:${process.env.ASSET_PAY_COMPANY_ID}`
            ).toString('base64'),
        },
        body: JSON.stringify(newBody),
      }
    );
    const dataTransaction = await resTransaction.json();
    console.log(dataTransaction);
    const qrcode = dataTransaction.pix.qrcode;

    return NextResponse.json({
      success: true,
      qrcode,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        errorMsg: 'Erro ao gerar pagamento, por favor tente novamente',
      },
      {
        status: 400,
      }
    );
  }
}
