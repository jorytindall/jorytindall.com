import { PageTitle } from "app/components/page-title";
import { ContactForm } from "./contact-form";
import { CenteredWrapper } from "app/components/layout";

export default function ContactPage() {
  return (
    <>
      <PageTitle
        title='Contact 👋'
        megaTitle='Get in touch'
      />
      <CenteredWrapper semanticElement='section'>
        <ContactForm />
      </CenteredWrapper>
    </>
  )
};
