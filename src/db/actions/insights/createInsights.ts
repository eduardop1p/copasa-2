'use server';

import insightsModel from '@/db/models/insights';
import InsightsProtocol from '@/interfaces/insightsProtocol';

import connectDb from '../../connect';

export default async function createInsights(
  body: Omit<InsightsProtocol, 'createdIn'>
): Promise<string | null> {
  try {
    await connectDb();
    const insight = await insightsModel.create(body);
    return String(insight._id);
  } catch (err) {
    console.log(err);
    return null;
  }
}
