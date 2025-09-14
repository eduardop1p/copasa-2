'use server';

import { FilterQuery } from 'mongoose';

import hitsModel, { HitsDocumentProtocol } from '@/db/models/hist';
import HitsProtocol from '@/interfaces/hitsProtocol';

import connectDb from '../../connect';

interface Props {
  query: FilterQuery<HitsDocumentProtocol>;
}

export default async function getHits({
  query,
}: Props): Promise<HitsProtocol[]> {
  try {
    await connectDb();
    const res = await hitsModel
      .find(query)
      .sort({
        createdIn: -1,
      })
      .limit(10);
    const data: HitsProtocol[] = res.map(item => ({
      city: item.city,
      country: item.country,
      hostname: item.hostname,
      ip: item.ip,
      loc: item.loc,
      org: item.org,
      postal: item.postal,
      region: item.region,
      timezone: item.timezone,
      createdIn: item.createdIn,
    }));
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
