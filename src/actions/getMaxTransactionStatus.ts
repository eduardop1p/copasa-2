'use server';

export default async function getMaxTransactionStatus(transactionId: string) {
  try {
    const resTransaction = await fetch(
      `https://api.fastsoftbrasil.com/api/user/transactions/${transactionId}`,
      {
        method: 'get',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization:
            'Basic ' +
            Buffer.from(`x:${process.env.MAX_GATEWAY_PAYMENT_SECRET}`).toString(
              'base64'
            ),
        },
      }
    );
    const dataTransaction = await resTransaction.json();
    const status = dataTransaction.data.status as string;
    // console.log(status);
    return status.toLowerCase();
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
