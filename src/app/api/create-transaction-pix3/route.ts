import { NextRequest, NextResponse } from 'next/server';

import TransactionPixProtocol3 from '@/interfaces/transactionPixProtocol3';

interface BodyProps extends TransactionPixProtocol3 {} // eslint-disable-line

export async function POST(req: NextRequest) {
  try {
    let { amount, paymentMethod, customer, items } =
      (await req.json()) as BodyProps;
    amount = +amount;
    items = items.map(item => ({ ...item, unitPrice: +item.unitPrice, quantity: +item.quantity })); // eslint-disable-line

    const newBody: TransactionPixProtocol3 = {
      amount,
      paymentMethod,
      customer,
      items,
      pix: { expiresInDays: 2 },
    };

    const resTransaction = await fetch(
      'https://api.pagshield.io/v1/transactions',
      {
        method: 'post',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization:
            'Basic ' +
            Buffer.from(`${process.env.PAGSHIELD_PAYMENT_SECRET}:x`).toString(
              'base64'
            ),
        },
        body: JSON.stringify(newBody),
      }
    );
    const dataTransaction = await resTransaction.json();
    // console.log(dataTransaction);
    const qrcode = dataTransaction.pix.qrcode;

    return NextResponse.json({
      success: true,
      qrcode,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        errorMsg: 'Erro criar transação',
      },
      {
        status: 400,
      }
    );
  }
}
