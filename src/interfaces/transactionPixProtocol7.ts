export default interface TransactionPixProtocol7 {
  currency: 'BRL';
  paymentMethod: 'pix';
  amount: number;
  items: {
    title: string;
    unitPrice: number;
    quantity: number;
    tangible: boolean;
  }[];
  customer: {
    name: string;
    email: string;
    document: { number: string; type: 'cpf' | 'cnpj' };
    phone: string;
  };
}
