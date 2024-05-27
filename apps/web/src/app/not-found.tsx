import Image from "next/image";
import { Headline, Paragraph } from "../components/typography";
import { Container } from "../components/layout";
// import notFoundImage from "./images/not-found-confused.gif"
import { TextArrow } from "../components/button";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404: Not found",
  description: "Sorry, couldn't find that page."
}

export default function NotFound() {
  return (
    <Container
      isFlex={true}
      flexDirection="column"
      justify="center"
      align="center"
      textAlign="center"
      gap="default"
      semanticElement="section"
    >
      <Image src='/images/not-found-confused.gif' width={500} alt="Not found" />
      <Headline color="primary" collapse>404</Headline>
      <Paragraph collapse>Sorry, couldn&apos;t find that page.</Paragraph>
      <TextArrow href="/">Go back home</TextArrow>
    </Container>
  )
}