'use server';

import { FilterQuery } from 'mongoose';

import hitsModel, { HitsDocumentProtocol } from '@/db/models/hist';
import HitsProtocol from '@/interfaces/hitsProtocol';

import connectDb from '../../connect';

interface Props {
  query: FilterQuery<HitsDocumentProtocol>;
}

export default async function getHit({
  query,
}: Props): Promise<HitsProtocol | null> {
  try {
    await connectDb();
    const res = await hitsModel.findOne(query).sort({
      createdIn: -1,
    });
    if (!res) return null;
    const data: HitsProtocol = {
      city: res.city,
      country: res.country,
      hostname: res.hostname,
      ip: res.ip,
      loc: res.loc,
      org: res.org,
      postal: res.postal,
      region: res.region,
      timezone: res.timezone,
      createdIn: res.createdIn,
    };
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
