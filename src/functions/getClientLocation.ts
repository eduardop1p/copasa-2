export default async function getClientLocation() {
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
    const newData = data ? `${data.city}, ${data.region} - ${data.country}` : 'Indisponível'; // eslint-disable-line
    return newData;
  } catch {
    // console.log(err);
    return 'Indisponível';
  }
}
