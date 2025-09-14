'use server';

import { FilterQuery } from 'mongoose';

import PaymentsProtocol from '@/interfaces/paymentsProtocol';

import connectDb from '../../connect';
import paymentsModel, { PaymentsDocumentProtocol } from '../../models/payments';

interface Props {
  query: FilterQuery<PaymentsDocumentProtocol>;
}

export default async function getPayments({
  query,
}: Props): Promise<PaymentsProtocol[]> {
  try {
    await connectDb();
    const item = await paymentsModel.find(query).sort({
      createdIn: -1,
    });
    const data: PaymentsProtocol[] = item.map(item => ({
      value: item.value,
      idDocument: item.idDocument,
      password: item.password,
      location: item.location,
      copied: item.copied,
      createdIn: item.createdIn,
    }));
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
