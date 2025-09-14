import { Schema, model, models, type Document, Model } from 'mongoose';

import UserProtocol from '@/interfaces/userProtocol';

export interface UserDocumentProtocol
  extends Omit<UserProtocol, '_id'>,
    Document {}

const usersSchema = new Schema<UserDocumentProtocol>({
  idDocument: { type: String, required: false, default: '' },
  password: { type: String, required: false, default: '' },
  name: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  installations: [
    {
      contactId: { type: String, required: false, default: '' },
      identifier: { type: String, required: false, default: '' },
      registration: { type: String, required: false, default: '' },
      location: { type: String, required: false, default: '' },
      neighborhood: { type: String, required: false, default: '' },
      publicPlace: { type: String, required: false, default: '' },
      streetnumber: { type: String, required: false, default: '' },
      streetComplementType: { type: String, required: false, default: '' },
      publicPlaceAddOn: { type: String, required: false, default: '' },
      CPFCNPJ: { type: String, required: false, default: '' },
      name: { type: String, required: false, default: '' },
      dateStartValidity: { type: String, required: false, default: '' },
      situation: { type: String, required: false, default: '' },
      debts: [
        {
          dueDate: { type: String, required: false, default: '' },
          referenceMonth: { type: String, required: false, default: '' },
          status: { type: String, required: false, default: '' },
          value: { type: Number, required: false, default: 0 },
        },
      ],
    },
  ],
  createdIn: {
    type: Date,
    required: false,
    default: Date.now,
    index: { expires: '24h' },
  },
});

const usersModel: Model<UserDocumentProtocol> =
  models.Copasa2025Users2 ||
  model<UserDocumentProtocol>('Copasa2025Users2', usersSchema);

export default usersModel;
