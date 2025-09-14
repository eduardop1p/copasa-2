'use server';

import hitsModel from '@/db/models/hist';
import HitsProtocol from '@/interfaces/hitsProtocol';

import connectDb from '../../connect';
// import getHit from './getHit';

export default async function createHits(
  body: Omit<HitsProtocol, 'createdIn'>
): Promise<HitsProtocol | null> {
  try {
    await connectDb();
    // const hasIp = await getHit({ query: { ip: body.ip } });
    // if (hasIp) return null;
    const res = await hitsModel.create(body);

    return {
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
  } catch (err) {
    console.log(err);
    return null;
  }
}
