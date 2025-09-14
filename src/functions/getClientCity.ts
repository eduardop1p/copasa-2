export default async function getClientCity() {
  try {
    const res = await fetch('https://ipinfo.io/json?token=5a15cc37ad4a73', {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('error');
    const data = await res.json();
    const newData = data.city as string;
    return newData.toUpperCase().trim();
  } catch {
    // console.log(err);
    return 'Indisponível';
  }
}
