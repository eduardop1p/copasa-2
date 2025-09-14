'use server';

import { FilterQuery } from 'mongoose';

import insightsModel, { InsightsDocumentProtocol } from '@/db/models/insights';

import connectDb from '../../connect';

interface Props {
  query: FilterQuery<InsightsDocumentProtocol>;
}

export default async function deleteInsights({ query }: Props) {
  try {
    await connectDb();
    await insightsModel.deleteMany(query);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
