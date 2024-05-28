'use server'

import { Resend } from "resend"
import ContactEmail from "email/ContactEmail"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({ name, email, message }) {
  try {
    const { data } = await resend.emails.send({
      from: 'Website contact form <hello@mail.jorytindall.com>',
      to: ['me@jorytindall.com'],
      subject: `${name} sent you a message through your website`,
      react: ContactEmail({ name: name, email: email, message: message }),
      reply_to: email
    })

    console.log(data)
  } catch (error) {
    throw new Error('Failed to send email')
  }
}
