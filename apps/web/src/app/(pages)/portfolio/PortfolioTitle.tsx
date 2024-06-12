import Image from 'next/image';
import { getSanityImageUrl } from 'utils/getSanityImage';
import { BentoBox, BentoItem } from 'components/bento';
import { Headline, Paragraph } from 'components/typography';
import { Badge } from 'components/badge';
import { Container } from 'components/layout';
import { TextArrow } from 'components/button';
import s from 'styles/pages/PortfolioItem.module.scss'

interface PortfolioTitleProps {
  title: string;
  overview: string;
  timeline: string;
  types: string[];
  externalLink: string;
  roles: string[];
  client: string;
  tools: string[];
  image?: {
    alternativeText: string
    asset: {
      _ref: string
      _type: string
    }
  }
}

const PortfolioTitle = ({
  title,
  overview,
  timeline,
  types,
  externalLink,
  roles,
  client,
  tools,
  image,
}: PortfolioTitleProps) => {

  // @ts-ignore
  const featuredImage = getSanityImageUrl(image.asset._ref)?.toString();

  return (
    <BentoBox isFullBleed={false}>
      {image &&
        <BentoItem
          size='full'
          padding='none'
          background='tertiary'
        >
          <div className={s['image-wrapper']}>
            <Image
              // @ts-ignore
              src={featuredImage}
              alt={image.alternativeText}
              fill
            />
          </div>
        </BentoItem>
      }
      <BentoItem
        size="x-large"
        padding="x-large"
        gap="large"
        background='primary'
      >
        <Badge text={client} type='inverse' />
        <Headline tag='h1' size='h1' color='light' collapse>{title}</Headline>
        <Paragraph color='light' collapse>{overview}</Paragraph>
        {externalLink &&
          <TextArrow
            style='dark'
            href={externalLink}
          >View project</TextArrow>
        }
      </BentoItem>
      <BentoItem
        size="medium"
        padding="x-large"
        gap="x-large"
        background='tertiary'
      >
        <Container
          semanticElement='section'
          isFlex
          flexDirection='column'
          gap='small'
          density='collapse'
        >
          <Headline
            color='secondary'
            tag='h2'
            size='h5'
            collapse
          >Project type</Headline>
          <Container
            isFlex
            flexDirection='row'
            gap='small'
            semanticElement='aside'
            density='collapse'
          >
            {types.map((type) => (
              <Badge key={type} text={type} type='primary' />
            ))}
          </Container>
        </Container>
        <Container
          semanticElement='section'
          isFlex
          flexDirection='column'
          gap='small'
          density='collapse'
        >
          <Headline
            color='secondary'
            tag='h2'
            size='h5'
            collapse
          >Project role</Headline>
          <Container
            isFlex
            flexDirection='row'
            gap='small'
            semanticElement='aside'
            density='collapse'
          >
            {roles.map((role) => (
              <Badge key={role} text={role} type='primary' />
            ))}
          </Container>
        </Container>
        <Container
          semanticElement='section'
          isFlex
          flexDirection='column'
          gap='small'
          density='collapse'
        >
          <Headline
            color='secondary'
            tag='h2'
            size='h5'
            collapse
          >Tools</Headline>
          <Container
            isFlex
            flexDirection='row'
            gap='small'
            semanticElement='aside'
            density='collapse'
          >
            {tools.map((tool) => (
              <Badge key={tool} text={tool} type='primary' />
            ))}
          </Container>
        </Container>
        <Container
          semanticElement='section'
          isFlex
          flexDirection='column'
          gap='small'
          density='collapse'
        >
          <Headline
            color='secondary'
            tag='h2'
            size='h5'
            collapse
          >Project timeline</Headline>
          <Badge text={timeline} type='primary' />
        </Container>
      </BentoItem>
    </BentoBox>
  );
}

export { PortfolioTitle }