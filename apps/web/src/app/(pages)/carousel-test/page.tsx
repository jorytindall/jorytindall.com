import { CenteredWrapper } from "components/layout"
import { Headline, Paragraph } from "components/typography"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "components/carousel"

export default function CarouselTest() {
  return (
    <CenteredWrapper>
      <p>Carousel test</p>
      <Carousel orientation='horizontal'>
        <CarouselContent
          opts={{
            align: 'start',
          }}
          className='w-full max-w-sm'
        >
          <CarouselItem className='basis-1/3'>
            <div>
              <Headline>Slide 1</Headline>
              <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>
            </div>
          </CarouselItem>
          <CarouselItem className='basis-1/3'>
            <div>
              <Headline>Slide 2</Headline>
              <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>
            </div>
          </CarouselItem>
          <CarouselItem className='basis-1/3'>
            <div>
              <Headline>Slide 3</Headline>
              <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>
            </div>
          </CarouselItem>
          <CarouselItem className='basis-1/3'>
            <div>
              <Headline>Slide 4</Headline>
              <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>
            </div>
          </CarouselItem>
          <CarouselItem className='basis-1/3'>
            <div>
              <Headline>Slide 5</Headline>
              <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </CenteredWrapper>
  )
}