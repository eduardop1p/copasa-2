import PaymentMethodsType from '@/types/paymentMethodsType';

export default interface TransactionPixProtocol3 {
  paymentMethod: PaymentMethodsType;
  amount: number;
  customer: {
    name: string;
    email: string;
    document: { number: string; type: 'cpf' | 'cnpj' };
  };
  items: {
    title: string;
    unitPrice: number;
    quantity: number;
    tangible: boolean;
  }[];
  pix: { expiresInDays: number };
}
