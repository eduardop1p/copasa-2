export default function getDataTheDay<T extends { createdIn: Date }>(arr: T[]) {
  if (!arr.length) return [];

  const dateNow = new Date();
  const day = dateNow.getDate();
  const month = dateNow.getMonth();
  const year = dateNow.getFullYear();

  return arr.filter(
    item =>
      new Date(item.createdIn).getDate() === day &&
      new Date(item.createdIn).getMonth() === month &&
      new Date(item.createdIn).getFullYear() === year
  );
}
