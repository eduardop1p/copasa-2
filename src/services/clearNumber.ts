export default function clearNumber(value: string) {
  return +value.replace(/[^\d]/g, '');
}
