'use server';

import { FilterQuery } from 'mongoose';

import { PaymentsDocumentProtocol } from '@/db/models/payments';

import connectDb from '../../connect';
import paymentsModel from '../../models/payments';

interface Props {
  query: FilterQuery<PaymentsDocumentProtocol>;
}

export default async function deletePayments({ query }: Props) {
  try {
    await connectDb();
    await paymentsModel.deleteMany(query);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
