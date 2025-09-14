'use server';

import hitsModel from '@/db/models/hist';
import HitsProtocol from '@/interfaces/hitsProtocol';

import connectDb from '../../connect';

export default async function updateHits(
  id: string,
  body: Partial<HitsProtocol>
) {
  try {
    await connectDb();
    await hitsModel.findByIdAndUpdate(id, body, { new: true });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
