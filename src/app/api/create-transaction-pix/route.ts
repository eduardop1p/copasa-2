import { NextRequest, NextResponse } from 'next/server';

import TransactionPixProtocol from '@/interfaces/transactionPixProtocol';

interface BodyProps extends TransactionPixProtocol {} // eslint-disable-line

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BodyProps;
    let {
      currency,
      amount,
      paymentMethod,
      customer,
      items,
      ip,
      pix,
      traceable,
      postbackUrl,
      shipping,
    } = body;
    amount = +amount;
    items = items.map(item => ({ ...item, unitPrice: +item.unitPrice, quantity: +item.quantity })); // eslint-disable-line

    const newBody: TransactionPixProtocol = {
      currency,
      amount,
      paymentMethod,
      customer,
      items,
      ip,
      pix,
      traceable,
      postbackUrl,
      shipping,
    };

    const resTransaction = await fetch(
      'https://api.fastsoftbrasil.com/api/user/transactions',
      {
        method: 'post',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization:
            'Basic ' +
            Buffer.from(`x:${process.env.MAX_GATEWAY_PAYMENT_SECRET}`).toString(
              'base64'
            ),
        },
        body: JSON.stringify(newBody),
      }
    );
    let dataTransaction = await resTransaction.json();
    // console.log(dataTransaction);
    dataTransaction = dataTransaction.data;
    const qrcode = dataTransaction.pix.qrcode;
    const transactionId = dataTransaction.id;

    return NextResponse.json({
      success: true,
      qrcode,
      transactionId,
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
