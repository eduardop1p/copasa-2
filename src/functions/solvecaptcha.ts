// npm install axios

const api_key = 'ba3f3fa2ee280eba5d30a5bafa58fe36';
const site_key = '6LeyogEmAAAAAFQnEUI4UYaCroCSufB5dEJe8Jg6';
const site_url = 'https://agenciavirtual.sabesp.com.br';

export default async function solvecaptcha() {
  try {
    const res = await fetch(
      `https://api.solvecaptcha.com/in.php?key=${api_key}&method=userrecaptcha&googlekey=${site_key}&pageurl=${site_url}&json=1&appear=1&here=now`,
      { method: 'get' }
    );
    const data = await res.json();

    const task_id = data.request;
    if (!task_id) {
      console.log('Failed to create task:', data);
      return {
        token: '',
        userAgent: '',
      };
    }
    console.log('Got taskId:', task_id);

    let isLoop = true;
    let status: any = null;
    while (isLoop) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Delay for 1 second

      const resp = await fetch(
        `https://api.solvecaptcha.com/res.php?key=${api_key}&action=get&id=${task_id}&json=1`,
        { method: 'get' }
      );
      status = await resp.json();
      if (status.request === 'CAPCHA_NOT_READY') continue;
      isLoop = false;
    }
    return {
      token: status.request,
      userAgent: status.useragent,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      token: '',
      userAgent: '',
    };
  }
}
