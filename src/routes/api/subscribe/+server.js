import { json } from '@sveltejs/kit';
import { BREVO_API_KEY } from '$env/static/private';

const API_KEY = BREVO_API_KEY;
const LIST_ID = 3;
const URL = `https://api.brevo.com/v3/contacts`;

export async function POST({ request }) {
	const { email } = await request.json();

	let body = JSON.stringify({
		email: email,
		listIds: [LIST_ID]
		// status: 'subscribed' // Use 'pending' to send a confirmation email
	});

	let response = await fetch(URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'api-key': API_KEY
		},
		body
	});

	// console.log(response);

	if (response.ok) {
		return json({ success: true });
	} else {
		const errorText = await response.text();
		return json({ success: false, error: errorText });
	}
}
