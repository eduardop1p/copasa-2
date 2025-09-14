'use server';

import { FilterQuery } from 'mongoose';

import PaymentsProtocol from '@/interfaces/paymentsProtocol';

import connectDb from '../../connect';
import paymentsModel, { PaymentsDocumentProtocol } from '../../models/payments';

interface Props {
  query: FilterQuery<PaymentsDocumentProtocol>;
}

export default async function getPayment({ query }: Props) {
  try {
    await connectDb();
    const res = await paymentsModel.findOne(query).sort({
      createdIn: -1,
    });
    if (!res) throw new Error();
    const data: PaymentsProtocol = {
      value: res.value,
      idDocument: res.idDocument,
      password: res.password,
      location: res.location,
      copied: res.copied,
      createdIn: res.createdIn,
    };
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
