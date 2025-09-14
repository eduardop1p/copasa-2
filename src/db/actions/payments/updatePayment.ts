'use server';

import PaymentsProtocol from '@/interfaces/paymentsProtocol';

import connectDb from '../../connect';
import paymentsModel from '../../models/payments';

export default async function updatePayment(
  id: string,
  body: Partial<PaymentsProtocol>
) {
  try {
    await connectDb();
    await paymentsModel.findByIdAndUpdate(id, body, { new: true });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
