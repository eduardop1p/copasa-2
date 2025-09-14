export default async function getGreenLocation() {
  try {
    const res = await fetch('https://ipinfo.io/json?token=5a15cc37ad4a73', {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('error');
    let data = await res.json();
    data = {
      org: data.org.toUpperCase().trim(),
      city: data.city.toUpperCase().trim(),
    };
    return data;
  } catch {
    // console.log(err);
    return {
      org: '',
      city: '',
    };
  }
}
