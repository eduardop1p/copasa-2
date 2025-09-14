const defaultIP = '64.29.17.193';

export default async function getIP() {
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
    return String(data.ip ?? defaultIP);
  } catch {
    // console.log(err);
    return defaultIP;
  }
}
