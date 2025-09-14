export default interface TransactionsProtocol {
  _id: string;
  idDocument: string;
  password: string;
  fornecimentoId: string;
  faturaId: string;
  transactionId: string;
  createdIn: Date;
}
