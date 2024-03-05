import { API_ENDPOINT } from '$env/static/private';

export const actions = {
    default: async ({ request }) => {
      const formData = await request.formData();
      const email = formData.get('EMAIL'); 
      
    //   const response = await fetch(process.env.API_ENDPOINT || API_ENDPOINT, {
      fetch('https://xyz.us11.list-manage.com/subscribe/post?u=d150dd71762335c56d7e5811c&id=6f099dd01d&f_id=005aaae0f0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ EMAIL: email }),
        // body: new URLSearchParams({ 'EMAIL': email }),
      }).then((response) => {
        console.log('response', response.data);
        console.log(JSON.stringify(response.data));
    }).catch((error) => {
        console.log(error);
    });
  }
};