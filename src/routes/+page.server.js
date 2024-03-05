import { API_ENDPOINT } from '$env/static/private';

export const config = {
    runtime: 'edge',
} 

export const actions = {
    default: async ({ request }) => {
      const formData = await request.formData();
      const email = formData.get('EMAIL'); 
      
    //   const response = await fetch(process.env.API_ENDPOINT || API_ENDPOINT, {
      const response = await fetch('https://xyz.us11.list-manage.com/subscribe/post?u=d150dd71762335c56d7e5811c&id=6f099dd01d&f_id=005aaae0f0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // body: new URLSearchParams({ EMAIL: email }),
        body: new URLSearchParams({ 'EMAIL': email }),
      });
  
      if (response.ok) {
        console.log('Success');
        return { success: true };
    } else {
          console.log('Error');
          console.log(await response.text());
        return { success: false, error: await response.text() };
      }
    },
  };
  