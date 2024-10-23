import { BentoItem } from 'components/bento';
import { Container } from 'components/layout';
import { Headline, Paragraph, InlineLink } from 'components/typography';
import { TextArrow } from 'components/button';

const HomeIntroduction = () => {
  return (
    <BentoItem
      size="x-large"
      background="tertiary"
      padding="x-large"
      gap="medium"
      isJustified
    >
      <Container
        isFlex
        density="collapse"
        gap="default"
        semanticElement="div"
      >
        <Headline tag="h1" size="h2" color="primary" collapse>
          Hey 🤘 My name is Jory Tindall.
        </Headline>
        <Headline tag="p" size="h4" color="primary" collapse>
          I&apos;m an empathetic interface and experience designer
          with passions for system-thinking and design systems,
          design technology, and shredding the saxophone,
          currently based in Seattle, Washington.
        </Headline>
        <Paragraph color='secondary' collapse>
          I&apos;m currently helping to empower a broad range of
          designers, engineers, and creative thinkers on the Design System
          team at{' '}
          <InlineLink
            type="external"
            target="_blank"
            href="https://helios.hashicorp.design"
          >
            HashiCorp,
          </InlineLink>{' '}
          previously at the{' '}
          <InlineLink
            type="external"
            target="_blank"
            href="https://t-mobile.com"
          >
            T-Mobile Design System team.
          </InlineLink>
        </Paragraph>
        <Paragraph color='secondary' collapse>
          You can also find me leading the charge to democratize
          music education at{' '}
          <InlineLink
            type="external"
            target="_blank"
            href="https://downbeatacademy.com"
          >
            Downbeat Academy
          </InlineLink>
          , collaborating in the Seattle music scene, and teaching
          teaching music to the next generation of shredders.
        </Paragraph>
      </Container>
      <TextArrow href="/about" style="primary">
        More about me
      </TextArrow>
    </BentoItem>

  )
}

export default HomeIntroduction