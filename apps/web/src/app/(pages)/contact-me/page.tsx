'use client'

import React, { useState } from 'react';
import { Button } from 'app/components/button';
import { Form, Input, Label, ItemWrapper, TextArea } from 'app/components/form';
import { sendContactEmail } from './send-contact-email';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Form action={sendContactEmail} name='contact-form'>
      <ItemWrapper>
        <Label htmlFor='name'>Name</Label>
        <Input
          type='text'
          name='name'
          onChange={e => setName(e.target.value)}
        />
      </ItemWrapper>
      <ItemWrapper>
        <Label htmlFor='email'>Email</Label>
        <Input type='email' name='email' onChange={e => setEmail(e.target.value)} />
      </ItemWrapper>
      <ItemWrapper>
        <Label htmlFor='message'>Message</Label>
        <TextArea name='message' onChange={e => setMessage(e.target.value)} />
      </ItemWrapper>
      <Button variant="primary" type="submit">Send email</Button>
    </Form>
  );
};
