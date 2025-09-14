'use server';

import screenModel from '@/db/models/screens';
import PixProtocol from '@/interfaces/pixProtocol';

export default async function updatePix(pixData: PixProtocol) {
  try {
    await screenModel.findByIdAndUpdate(process.env.SCREEN_ID, pixData, {
      new: true,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
