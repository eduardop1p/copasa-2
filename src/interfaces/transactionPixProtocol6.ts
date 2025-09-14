export default interface TransactionPixProtocol6 {
  payment_method: 'pix';
  description: string;
  amount: number;
  customer: {
    name: string;
    email: string;
    document: string;
    phone: string;
  };
  metadata: { order_id: string; product_id: string };
  postbackUrl: string;
}
