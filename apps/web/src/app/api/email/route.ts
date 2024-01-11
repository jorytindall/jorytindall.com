import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactEmail from 'email/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {

  const { name, email, message } = await request.json();

  try {
    const data = await resend.emails.send({
      from: 'Website contact form <hello@mail.jorytindall.com>',
      to: ['jory@hypecreativestudios.com'],
      subject: `${name} sent you a message through your website`,
      reply_to: email,
      react: ContactEmail({ name: name, email: email, message: message }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}