export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get('EMAIL'); 
        console.log('email', email);
        let body = new URLSearchParams();
        body.append('EMAIL', email);
        let response = await fetch('https://xyz.us11.list-manage.com/subscribe/post?u=d150dd71762335c56d7e5811c&id=6f099dd01d&f_id=005aaae0f0', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          // body: new URLSearchParams({ EMAIL: email }),
          body
        })

        console.log('response', response);

        if(response.status === 200) {
          return { success: true }
        } else {
          return { success: false, error: 'There was an error: ' + (await response.text())}
        }
  }
};