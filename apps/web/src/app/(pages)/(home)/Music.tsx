import { BentoItem } from "components/bento"
import { Container } from "components/layout"
import { Headline, Paragraph } from "components/typography"
import { TextArrow } from "components/button"

const HomeMusic = () => {
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
          Music
        </Headline>
        <Paragraph type="secondary" collapse>
          Music projects, original compositions, current working
          ensembles.
        </Paragraph>
      </Container>
      <TextArrow href="/music" style="neutral">
        My music
      </TextArrow>
    </BentoItem>
  )
}

export default HomeMusic