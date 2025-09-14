import { Schema, model, models, type Document, Model } from 'mongoose';

import HitsProtocol from '@/interfaces/hitsProtocol';

export interface HitsDocumentProtocol extends HitsProtocol, Document {}

const hitsSchema = new Schema<HitsDocumentProtocol>({
  city: { type: String, required: false },
  country: { type: String, required: false },
  hostname: { type: String, required: false },
  ip: { type: String, required: false },
  loc: { type: String, required: false },
  org: { type: String, required: false },
  postal: { type: String, required: false },
  region: { type: String, required: false },
  timezone: { type: String, required: false },
  createdIn: { type: Date, required: false, default: Date.now },
});

const hitsModel: Model<HitsDocumentProtocol> =
  models.Copasa2025Hits2 ||
  model<HitsDocumentProtocol>('Copasa2025Hits2', hitsSchema);

export default hitsModel;
