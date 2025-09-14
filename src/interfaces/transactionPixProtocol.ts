export default interface TransactionPixProtocol {
  currency: 'BRL';
  paymentMethod: 'PIX';
  amount: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    document: { number: string; type: 'cpf' | 'cnpj' };
    address: {
      street: string;
      streetNumber: string;
      complement: string;
      zipCode: string;
      neighborhood: string;
      city: string;
      state: string;
      country: string;
    };
  };
  items: {
    title: string;
    unitPrice: number;
    quantity: number;
    tangible: boolean;
  }[];
  shipping: {
    fee: number;
    address: {
      street: string;
      streetNumber: string;
      complement: string;
      zipCode: string;
      neighborhood: string;
      city: string;
      state: string;
      country: string;
    };
  };
  pix: { expiresInDays: number };
  traceable: boolean;
  ip: string;
  postbackUrl: string;
}
