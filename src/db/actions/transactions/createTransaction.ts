'use server';

import transactionsModel from '@/db/models/transactions';
import TransactionsProtocol from '@/interfaces/transactionsProtocol';

import connectDb from '../../connect';

export default async function createTransaction(
  body: Omit<TransactionsProtocol, '_id' | 'createdIn'>
): Promise<string | null> {
  try {
    await connectDb();
    const transaction = await transactionsModel.create(body);
    return String(transaction._id);
  } catch (err) {
    console.log(err);
    return null;
  }
}
