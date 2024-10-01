import { PageTitle } from "components/page-title";
import { ContactForm } from "./contact-form";
import { CenteredWrapper } from "components/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contact | Jory Tindall',
  description: 'Get in touch and say hello!',
};

export default function ContactPage() {
  return (
    <>
      <PageTitle
        title='Contact 👋'
        megaTitle='Say hello.'
      />
      <CenteredWrapper semanticElement='section'>
        <ContactForm />
      </CenteredWrapper>
    </>
  )
};