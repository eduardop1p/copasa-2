'use server';

import usersModel from '@/db/models/user';
import UserProtocol from '@/interfaces/userProtocol';

import connectDb from '../../connect';

export default async function createUser(
  body: Omit<UserProtocol, '_id' | 'createdIn'>
): Promise<UserProtocol | null> {
  try {
    await connectDb();
    const res = await usersModel.create(body);
    return {
      _id: String(res._id),
      idDocument: res.idDocument,
      password: res.password,
      name: res.name,
      email: res.email,
      phone: res.phone,
      installations: res.installations.map(itemInstallation => ({
        _id: String(itemInstallation._id),
        contactId: itemInstallation.contactId,
        identifier: itemInstallation.identifier,
        registration: itemInstallation.registration,
        location: itemInstallation.location,
        neighborhood: itemInstallation.neighborhood,
        publicPlace: itemInstallation.publicPlace,
        streetnumber: itemInstallation.streetnumber,
        streetComplementType: itemInstallation.streetComplementType,
        publicPlaceAddOn: itemInstallation.publicPlaceAddOn,
        CPFCNPJ: itemInstallation.CPFCNPJ,
        name: itemInstallation.name,
        dateStartValidity: itemInstallation.dateStartValidity,
        situation: itemInstallation.situation,
        debts: itemInstallation.debts.map(itemDebts => ({
          _id: String(itemDebts._id),
          dueDate: itemDebts.dueDate,
          referenceMonth: itemDebts.referenceMonth,
          status: itemDebts.status,
          value: itemDebts.value,
        })),
      })),
      createdIn: res.createdIn,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}
