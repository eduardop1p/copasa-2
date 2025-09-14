'use server';

import { FilterQuery } from 'mongoose';

import transactionModel, {
  TransactionsDocumentProtocol,
} from '@/db/models/transactions';
import TransactionsProtocol from '@/interfaces/transactionsProtocol';

import connectDb from '../../connect';

interface Props {
  query: FilterQuery<TransactionsDocumentProtocol>;
}

export default async function getTransaction({ query }: Props) {
  try {
    await connectDb();
    const res = await transactionModel.findOne(query).sort({
      createdIn: -1,
    });
    if (!res) throw new Error('Usuário não encontrado');
    const data: TransactionsProtocol = {
      _id: String(res._id),
      idDocument: res.idDocument,
      password: res.password,
      fornecimentoId: res.fornecimentoId,
      faturaId: res.faturaId,
      transactionId: res.fornecimentoId,
      createdIn: res.createdIn,
    };
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
