'use client'

import React, { useState } from 'react';
import { Resend } from 'resend';
import { ContactFormEmail } from 'app/components/email/contact-form';
import { Button } from 'app/components/button';
import { Form, Input, Label, ItemWrapper, TextArea } from 'app/components/form';

export default async function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function send(e) {
    'use server';
    e.preventDefault();

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data } = await resend.emails.send({
      from: `${name} <${email}>`,
      to: ['jory@hypecreativestudios.com'],
      subject: `Email from ${name} via jorytindall.com`,
      react: ContactFormEmail({ name, email, message }),
    });

    console.log(data);
  }

  return (
    <Form action={send} name='contact-form'>
      <ItemWrapper>
        <Label htmlFor='name'>Name</Label>
        <Input type='text' name='name' />
      </ItemWrapper>
      <ItemWrapper>
        <Label htmlFor='email'>Email</Label>
        <Input type='email' name='email' />
      </ItemWrapper>
      <ItemWrapper>
        <Label htmlFor='message'>Message</Label>
        <TextArea name='message' />
      </ItemWrapper>
      <Button variant="primary" type="submit">Send email</Button>
    </Form>
  );
};
