import { BentoItem } from "components/bento"
import { Container } from "components/layout"
import { Headline, Paragraph } from "components/typography"
import { TextArrow } from "components/button"

const HomePortfolio = () => {
  return (
    <BentoItem
      size="medium"
      padding="x-large"
      gap="small"
      background="tertiary"
      isJustified
    >
      <Container
        isFlex
        flexDirection="column"
        semanticElement="div"
        density="collapse"
      >
        <Headline tag="h3" size="h4" color="primary" collapse>
          Portfolio
        </Headline>
        <Paragraph type="secondary" collapse>
          Recent work in design, engineering, and other creative
          projects.
        </Paragraph>
      </Container>
      <TextArrow href="/portfolio" style="neutral">
        My portfolio
      </TextArrow>
    </BentoItem>
  )
}

export default HomePortfolio