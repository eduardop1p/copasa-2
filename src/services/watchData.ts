export default async function watchData<T>(data: T) {
  const start = Date.now();
  const maxTime = 20000;
  const interval = 1000;

  while (true) {
    if (data) {
      return data; // encerra a função se encontrou
    }
    // se passou do tempo máximo, encerra retornando null
    if (Date.now() - start > maxTime) {
      return null;
    }
    // espera antes de checar de novo
    await new Promise(res => setTimeout(res, interval));
  }
}
