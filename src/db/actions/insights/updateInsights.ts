'use server';

import insightsModel from '@/db/models/insights';
import InsightsProtocol from '@/interfaces/insightsProtocol';

import connectDb from '../../connect';

export default async function updateInsights(
  id: string,
  body: Partial<InsightsProtocol>
) {
  try {
    await connectDb();
    await insightsModel.findByIdAndUpdate(id, body, { new: true });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
