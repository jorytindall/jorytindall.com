import { PageTitle } from "app/components/page-title";
import { ContactForm } from "./contact-form";
import { CenteredWrapper } from "app/components/layout";

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