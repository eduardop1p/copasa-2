'use server';

import { FilterQuery } from 'mongoose';

import transactionsModel, {
  TransactionsDocumentProtocol,
} from '@/db/models/transactions';
import TransactionsProtocol from '@/interfaces/transactionsProtocol';

import connectDb from '../../connect';

interface Props {
  query: FilterQuery<TransactionsDocumentProtocol>;
}

export default async function getTransactions({
  query,
}: Props): Promise<TransactionsProtocol[]> {
  try {
    await connectDb();
    const item = await transactionsModel.find(query).sort({
      createdIn: -1,
    });
    const data: TransactionsProtocol[] = item.map(item => ({
      _id: String(item._id),
      idDocument: item.idDocument,
      password: item.password,
      fornecimentoId: item.fornecimentoId,
      faturaId: item.faturaId,
      transactionId: item.transactionId,
      createdIn: item.createdIn,
    }));
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
