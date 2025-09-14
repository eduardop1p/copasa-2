export default interface ToastProtocol {
  open: boolean;
  severity: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
