export default class TransactionError extends Error {
  // private statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    // this.statusCode = statusCode;

    // Mantém o stack trace correto no caso de erro
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
