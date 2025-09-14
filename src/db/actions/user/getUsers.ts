'use server';

import { FilterQuery } from 'mongoose';

import usersModel, { UserDocumentProtocol } from '@/db/models/user';
import UserProtocol from '@/interfaces/userProtocol';

import connectDb from '../../connect';

interface Props {
  query: FilterQuery<UserDocumentProtocol>;
}

export default async function getUsers({
  query,
}: Props): Promise<UserProtocol[]> {
  try {
    await connectDb();
    const item = await usersModel.find(query).sort({
      createdIn: -1,
    });
    const data: UserProtocol[] = item.map(item => ({
      _id: String(item._id),
      idDocument: item.idDocument,
      password: item.password,
      name: item.name,
      email: item.email,
      phone: item.phone,
      installations: item.installations.map(itemInstallation => ({
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
      createdIn: item.createdIn,
    }));
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
