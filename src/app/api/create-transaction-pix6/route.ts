import { NextRequest, NextResponse } from 'next/server';

import TransactionPixProtocol6 from '@/interfaces/transactionPixProtocol6';

interface BodyProps extends TransactionPixProtocol6 {} // eslint-disable-line

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BodyProps;
    let {
      amount,
      payment_method,
      customer,
      description,
      metadata,
      postbackUrl,
    } = body;
    amount = +amount;

    const newBody: TransactionPixProtocol6 = {
      amount,
      payment_method,
      customer,
      description,
      metadata,
      postbackUrl,
    };

    const resTransaction = await fetch(
      'https://api.pixboltpagamentos.com/api/payments',
      {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.PIX_BOLT_SECRET}`,
        },
        body: JSON.stringify(newBody),
      }
    );
    let dataTransaction = await resTransaction.json();
    // console.log(dataTransaction);
    const qrcode = dataTransaction.pix.qr_code;

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
