'use server';

import PaymentsProtocol from '@/interfaces/paymentsProtocol';

import connectDb from '../../connect';
import paymentsModel from '../../models/payments';

export default async function createPayment(
  body: Omit<PaymentsProtocol, 'createdIn'>
): Promise<string | null> {
  try {
    await connectDb();
    const payment = await paymentsModel.create(body);
    return String(payment._id);
  } catch (err) {
    console.log(err);
    return null;
  }
}
