import mongoose, { model, Model, models } from 'mongoose';

const screenModel: Model<any> =
  models.Screens || model<any>('Screens', new mongoose.Schema({}, { strict: false })); // eslint-disable-line

export default screenModel;
