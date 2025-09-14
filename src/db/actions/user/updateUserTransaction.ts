'use server';

import usersModel from '@/db/models/user';

import connectDb from '../../connect';

export default async function updateUserTransaction(
  userId: string,
  body: { supplyId: string; invoicesIds: string[]; transactionId: string }
) {
  try {
    await connectDb();
    for (const invoiceId of body.invoicesIds) {
      await usersModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            'fornecimentos.$[f].faturas.$[ft].transactionId':
              body.transactionId,
          },
        },
        {
          arrayFilters: [{ 'f._id': body.supplyId }, { 'ft._id': invoiceId }],
          new: true, // opcional: retorna o documento atualizado
        }
      );
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
