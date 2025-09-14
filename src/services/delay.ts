export default async function delay(ms: number) {
  return await new Promise(rs => setTimeout(rs, ms));
}
