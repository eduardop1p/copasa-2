export default function reduceArray<T extends { value: number }>(arr: T[]) {
  return arr.reduce((p, c) => p + c.value, 0);
}
