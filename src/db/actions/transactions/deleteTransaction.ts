'use server';

import { FilterQuery } from 'mongoose';

import { TransactionsDocumentProtocol } from '@/db/models/transactions';
import transactionModel from '@/db/models/transactions';

import connectDb from '../../connect';

interface Props {
  query: FilterQuery<TransactionsDocumentProtocol>;
}

export default async function deleteTransaction({ query }: Props) {
  try {
    await connectDb();
    await transactionModel.deleteMany(query);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
