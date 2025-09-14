'use server';

import { FilterQuery } from 'mongoose';

import hitsModel, { HitsDocumentProtocol } from '@/db/models/hist';

import connectDb from '../../connect';

interface Props {
  query: FilterQuery<HitsDocumentProtocol>;
}

export default async function deleteHits({ query }: Props) {
  try {
    await connectDb();
    await hitsModel.deleteMany(query);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
