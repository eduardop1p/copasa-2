'use server';

import transactionsModel from '@/db/models/transactions';
import TransactionsProtocol from '@/interfaces/transactionsProtocol';

import connectDb from '../../connect';

export default async function updateTransaction(
  id: string,
  body: Partial<TransactionsProtocol>
) {
  try {
    await connectDb();
    await transactionsModel.findByIdAndUpdate(id, body, { new: true });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
