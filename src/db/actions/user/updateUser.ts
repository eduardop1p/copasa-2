'use server';

import usersModel from '@/db/models/user';
import UserProtocol from '@/interfaces/userProtocol';

import connectDb from '../../connect';

export default async function updateUser(
  id: string,
  body: Partial<UserProtocol>
) {
  try {
    await connectDb();
    await usersModel.findByIdAndUpdate(id, body, { new: true });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
