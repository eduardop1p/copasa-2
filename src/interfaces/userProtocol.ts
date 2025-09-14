export default interface UserProtocol {
  _id: string;
  password: string;
  idDocument: string;
  name: string;
  email: string;
  phone: string;
  installations: {
    _id: string;
    contactId: string;
    identifier: string;
    registration: string;
    location: string;
    neighborhood: string;
    publicPlace: string;
    streetnumber: string;
    streetComplementType: string;
    publicPlaceAddOn: string;
    CPFCNPJ: string;
    name: string;
    dateStartValidity: string;
    situation: string;
    debts: {
      _id: string;
      dueDate: string;
      referenceMonth: string;
      status: string;
      value: number;
    }[];
  }[];
  createdIn: Date;
}
