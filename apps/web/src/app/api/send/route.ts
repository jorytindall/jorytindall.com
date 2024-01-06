import * as React from 'react';
import { ContactForm } from 'app/components/email/contact-form';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: ContactForm({ email: "jorytindall@gmail.com" }) as React.ReactElement,
      to: ['hello@jorytindall.com'],
      subject: `Message from your website form`,
      react: ContactForm({ name: "John" }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}