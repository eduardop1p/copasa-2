import { NextRequest, NextResponse } from 'next/server';

import TransactionPixProtocol7 from '@/interfaces/transactionPixProtocol7';

interface BodyProps extends TransactionPixProtocol7 {} // eslint-disable-line

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BodyProps;
    let { amount, paymentMethod, currency, customer, items } = body;
    amount = +amount;

    const newBody: TransactionPixProtocol7 = {
      amount,
      paymentMethod,
      currency,
      items,
      customer,
    };

    const resTransaction = await fetch(
      'https://api.podpay.pro/v1/transactions',
      {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          authorization:
            'Basic ' +
            Buffer.from(
              process.env.POD_PAY_PUBLIC + ':' + process.env.POD_PAY_SECRET
            ).toString('base64'),
        },
        body: JSON.stringify(newBody),
      }
    );
    let dataTransaction = await resTransaction.json();
    const qrcode = dataTransaction.pix.qrcode;

    return NextResponse.json({
      success: true,
      qrcode,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: 'Erro ao gerar pagamento, por favor tente novamente',
          description: '',
        },
      },
      { status: 400 }
    );
  }
}
