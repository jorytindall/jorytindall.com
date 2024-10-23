import { BentoItem } from 'components/bento'
import { Container } from 'components/layout'
import { Headline } from 'components/typography'
import { TextArrow } from 'components/button'
import { EventList } from 'components/event'

const HomeEvents = ({ events }) => {
  return (
    <BentoItem
      size="medium"
      padding="x-large"
      gap="large"
      background="dark"
      isJustified
    >
      <Container
        isFlex
        flexDirection="column"
        semanticElement="div"
        density="collapse"
        gap="default"
      >
        <Headline tag="h2" size="h4" color="light" collapse>
          Upcoming events
        </Headline>
        <EventList events={events} />
      </Container>
      <TextArrow href="/events" style="dark">
        All events
      </TextArrow>
    </BentoItem>
  )
}

export default HomeEvents