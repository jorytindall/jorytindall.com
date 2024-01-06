import * as React from 'react';

interface ContactFormProps {
  name: string,
  email: string,
  message: string,
}

export const ContactFormEmail: React.FC<Readonly<ContactFormProps>> = ({
  name,
  from,
  message,
}) => (
  <div>
    <h1>You recieved a message from <a href={`mailto:${from}`}>{name}</a>!</h1>
    <p>{message}</p>
  </div>
);
