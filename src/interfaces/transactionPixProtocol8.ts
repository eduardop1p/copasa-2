export default interface TransactionPixProtocol8 {
  paymentMethod: 'PIX';
  amount: number;
  customer: {
    name: string;
    email: string;
    document: { number: string; type: 'CPF' | 'CNPJ' };
    phone: string;
  };
  shipping: {
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
  }[];
}
