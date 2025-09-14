import { NextRequest, NextResponse } from 'next/server';

import TransactionPixProtocol2 from '@/interfaces/transactionPixProtocol2';

interface BodyProps extends TransactionPixProtocol2 {} // eslint-disable-line

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BodyProps;
    let { amount, items } = body;
    amount = +amount;
    items = items.map(item => ({ ...item, unitPrice: +item.unitPrice, quantity: +item.quantity })); // eslint-disable-line

    const newBody: TransactionPixProtocol2 = {
      ...body,
      amount,
      items,
    };

    const resTransaction = await fetch(
      'https://api.aurapagamento.com/v1/transaction',
      {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'x-secret-key': 'secret_hEsPHA8tWJlMzNaN',
          'x-public-key': 'public_w4HZ7YN1ErMe4jmO',
        },
        body: JSON.stringify(newBody),
      }
    );
    const dataTransaction = await resTransaction.json();
    // console.log(dataTransaction);
    const qrcode = dataTransaction.pix.payload;

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
