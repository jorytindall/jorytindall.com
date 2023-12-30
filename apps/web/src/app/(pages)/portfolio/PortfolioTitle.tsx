import { BentoBox, BentoItem } from 'app/components/bento';
import { Headline, Paragraph } from 'app/components/typography';
import { Badge } from 'app/components/badge';
import { Container } from 'app/components/layout';

interface PortfolioTitleProps {
  title: string;
  overview: string;
  timeline: string;
  types: string[];
  externalLink: string;
  roles: string[];
  client: string;
  tools: string[];
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
}: PortfolioTitleProps) => {
  return (
    <BentoBox>
      <BentoItem
        size="x-large"
        padding="x-large"
        gap="large"
        background='primary'
      >
        <Headline tag='h1' size='h1' color='light' collapse>{title}</Headline>
        <Paragraph color='light' collapse>{overview}</Paragraph>
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
          <Paragraph color='secondary' collapse>{timeline}</Paragraph>
        </Container>
      </BentoItem>
    </BentoBox>
  );
}

export { PortfolioTitle }