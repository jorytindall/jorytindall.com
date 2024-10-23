import { BentoItem } from "components/bento"
import { Container } from "components/layout"
import { Headline, Paragraph } from "components/typography"
import { TextArrow } from "components/button"

const HomeContact = () => {
  return (
    <BentoItem
      size="medium"
      padding="x-large"
      gap="small"
      background="secondary"
      isJustified
    >
      <Container
        isFlex
        flexDirection="column"
        semanticElement="div"
        density="collapse"
      >
        <Headline tag="h3" size="h4" color="secondary" collapse>
          Get in touch
        </Headline>
        <Paragraph type="secondary" collapse>
          Reach out to say hello 👋!
        </Paragraph>
      </Container>
      <TextArrow href="/contact" style="neutral">
        Contact me
      </TextArrow>
    </BentoItem>
  )
}

export default HomeContact