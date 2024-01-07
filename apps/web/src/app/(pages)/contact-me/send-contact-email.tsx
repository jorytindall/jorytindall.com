'use server';

import { Resend } from 'resend';
import { ContactFormEmail } from 'app/components/email/contact-form';

interface ContactFormProps {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail({ name, email, message }: ContactFormProps) {

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data } = await resend.emails.send({
    from: `Website <hello@mail.jorytindall.com>`,
    to: 'hello@jorytindall.com',
    subject: `Email from ${name} via jorytindall.com`,
    react: ContactFormEmail(
      {
        name: "Jory",
        email: "jory@jory.com",
        message: "Sample message"
      }
    ),
  });

  console.log(data);
}