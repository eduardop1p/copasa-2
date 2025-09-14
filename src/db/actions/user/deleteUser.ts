'use server';

import { FilterQuery } from 'mongoose';

import { UserDocumentProtocol } from '@/db/models/user';
import usersModel from '@/db/models/user';

import connectDb from '../../connect';

interface Props {
  query: FilterQuery<UserDocumentProtocol>;
}

export default async function deleteUser({ query }: Props) {
  try {
    await connectDb();
    await usersModel.deleteMany(query);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
