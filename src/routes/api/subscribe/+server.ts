import { json } from '@sveltejs/kit';
import { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID } from '$env/static/private';

const API_KEY = MAILCHIMP_API_KEY;
const LIST_ID = MAILCHIMP_LIST_ID;
const SERVER_PREFIX = 'usX'; // Replace 'usX' with your actual data center prefix
const URL = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

export async function POST({ request }) {
	const { email } = await request.json();

	let body = JSON.stringify({
		email_address: email,
		status: 'subscribed' // Use 'pending' to send a confirmation email
	});

	let response = await fetch(URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + API_KEY
		},
		body
	});

	if (response.ok) {
		return json({ success: true });
	} else {
		const errorText = await response.text();
		return json({ success: false, error: 'There was an error: ' + errorText });
	}
}
