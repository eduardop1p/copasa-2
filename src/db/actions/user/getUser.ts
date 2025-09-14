'use server';

import { FilterQuery } from 'mongoose';

import usersModel, { UserDocumentProtocol } from '@/db/models/user';
import UserProtocol from '@/interfaces/userProtocol';

import connectDb from '../../connect';

interface Props {
  query: FilterQuery<UserDocumentProtocol>;
}

export default async function getUser({ query }: Props) {
  try {
    await connectDb();
    const res = await usersModel.findOne(query).sort({
      createdIn: -1,
    });
    if (!res) throw new Error('Usuário não encontrado');
    // console.log(res);
    const data: UserProtocol = {
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
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
