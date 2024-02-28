// import { API_ENDPOINT } from '$env/static/private';

// export const actions = {
//     default: async ({ request }) => {
//       const formData = await request.formData();
//       const email = formData.get('EMAIL'); 
      
//       const response = await fetch(process.env.API_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: new URLSearchParams({ EMAIL: email }),
//         // body: new URLSearchParams({ 'EMAIL': email }),
//       });
  
//       if (response.ok) {
//         console.log('Success');
//         return { success: true };
//     } else {
//           console.log('Error');
//         return { success: false, error: await response.text() };
//       }
//     },
//   };
  