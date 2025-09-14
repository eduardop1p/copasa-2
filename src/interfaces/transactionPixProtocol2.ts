export default interface TransactionPixProtocol2 {
  amount: number;
  externalRef: string;
  postbackUrl: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    document: {
      type: 'cpf' | 'cnpj';
      number: string;
    };
  };
  traceable: boolean;
  metadata: string;
  items: {
    title: string;
    unitPrice: number;
    quantity: number;
    tangible: boolean;
    externalRef: string;
    product_image: string;
  }[];
  paymentMethod: string;
  installments: string;
}
