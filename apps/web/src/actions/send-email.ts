'use server';

import { Resend } from 'resend';
import ContactEmail from 'email/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ name, email, message }) {
	// The e2e suite submits the contact form for real, so without this guard every
	// run delivers live mail to the inbox — three per run, one per browser. Set only
	// by the Playwright webServer config; nothing in production ever sets it.
	if (process.env.E2E_TEST_MODE === 'true') {
		// console.warn, not console.log: Playwright pipes the dev server's stderr but
		// ignores its stdout, so this is what makes the suppression visible in a run.
		console.warn(`[E2E_TEST_MODE] suppressed contact email from ${email}`);
		return;
	}

	try {
		const { data } = await resend.emails.send({
			from: 'Website contact form <hello@mail.jorytindall.com>',
			to: ['me@jorytindall.com'],
			subject: `${name} sent you a message through your website`,
			react: ContactEmail({ name: name, email: email, message: message }),
			replyTo: email,
		});

		console.log(data);
	} catch (error) {
		throw new Error('Failed to send email');
	}
}
