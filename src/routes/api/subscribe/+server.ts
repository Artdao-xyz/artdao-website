import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { email } = await request.json();

    console.log('email', email);
    let body = new URLSearchParams();
    body.append('EMAIL', email);
    let response = await fetch(
        'https://xyz.us11.list-manage.com/subscribe/post?u=d150dd71762335c56d7e5811c&id=6f099dd01d&f_id=005aaae0f0',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // body: new URLSearchParams({ EMAIL: email }),
            body
        }
    );

    console.log('response', response);

    if (response.status === 200) {
        return json({ success: true });
    } else {
        return json({ success: false, error: 'There was an error: ' + (await response.text()) });
    }
}
