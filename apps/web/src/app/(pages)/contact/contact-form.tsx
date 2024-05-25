'use client'

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Form, Input, TextArea } from 'components/form';
import { Button } from 'components/button';

interface ContactFormProps {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<ContactFormProps>();

  async function onSubmit(formData: ContactFormProps) {
    await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),

    }).then(() => {
      // Toast notification
      toast.success('Your email message has been sent successfully', {
        duration: 5000,
        position: 'top-center',
        className: 'custom-toast',
        icon: '🚀'
      });
    });

    reset();
  }



  return (
    <Form
      name='contact'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label='Name'
        name='name'
        type='text'
        placeholder='John Coltrane'
        id='name'
        register={register}
        errors={errors}
        validationSchema={{
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters long',
          },
        }}
      />
      <Input
        label='Email'
        name='email'
        type='email'
        placeholder='john@coltrane.com'
        id='email'
        register={register}
        errors={errors}
        validationSchema={{
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Entered value does not match email format',
          },
        }}
      />
      <TextArea
        placeholder='{...typing}'
        id='message'
        name='message'
        label='Message'
        rows={6}
        regsiter={register}
        errors={errors}
        validationSchema={{
          required: 'Message is required',
        }}
      />
      <Button
        type='submit'
        variant='primary'
      >{isSubmitting ? 'Sending...' : 'Send a message'}</Button>
    </Form>
  )
}