// import { API_ENDPOINT } from '$env/static/private';
// import { env } from '$env/dynamic/private';

// export const config = {
//     runtime: "edge",
// }


  export const actions = {
    default: async ({ request }) => {

        const formData = await request.formData();
        const email = formData.get('EMAIL');
        
        console.log(email);

        const response = await fetch('https://xyz.us11.list-manage.com/subscribe/post?u=d150dd71762335c56d7e5811c&id=6f099dd01d&f_id=005aaae0f0', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'EMAIL': email,
            }),
        });

        if (response.status === 200) {
            console.log('Success');
            return {
                status: 200,
                body: {
                    message: 'Success',
                },
            };
        } else {
            console.log('Failed');
            return {
                status: 500,
                body: {
                    message: 'Failed',
                },
            };
        }
    }
  };
  