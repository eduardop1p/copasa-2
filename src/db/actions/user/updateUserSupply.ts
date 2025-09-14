'use server';

import usersModel from '@/db/models/user';

import connectDb from '../../connect';

export default async function updateUserSupply(
  userId: string,
  body: { supplyId: string; supply: string }
) {
  try {
    await connectDb();
    await usersModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          'fornecimentos.$[f]': body.supply,
        },
      },
      {
        arrayFilters: [{ 'f._id': body.supplyId }],
        new: true,
      }
    );

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
