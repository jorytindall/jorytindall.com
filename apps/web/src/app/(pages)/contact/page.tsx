import { PageTitle } from "components/page-title";
import { ContactForm } from "./contact-form";
import { CenteredWrapper } from "components/layout";

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