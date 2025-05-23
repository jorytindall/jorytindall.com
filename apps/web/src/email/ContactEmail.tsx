import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Link,
  Hr,
} from '@react-email/components';

type ContactEmailProps = {
  name: string;
  email: string;
  message: string;
};

const ContactEmail = ({ name, email, message }: ContactEmailProps) => {
  const previewText = `${name} sent you a message through your website`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body>
        <Container>
          <Heading as='h1'>New website contact form submission</Heading>
          <Hr />
          <Text>
            <strong><Link href={`mailto:${email}`}>{name}</Link> sent you a message through your website</strong>
          </Text>
          <Text><strong>Message:</strong></Text>
          <Text>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmail;