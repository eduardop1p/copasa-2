export default interface PaymentsProtocol {
  value: number;
  idDocument: string;
  password: string;
  location: string;
  copied: boolean;
  createdIn: Date;
}
