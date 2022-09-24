import Image from 'next/image'
import { InlineLink, Headline, Paragraph } from "components/typography"
import { Container } from 'components/layout'

export default function Custom404() {
    return (
        <Container
            semanticElement='div'
            isFlex
            flexDirection='column'
            align='center'
            density='packed'
            textAlign='center'
        >
            <Image
                src='/images/not-found-confused.gif'
                alt='Page not found'
                width={600}
                height={350}
                priority
            />
            <Headline type='h1'>404, not found :(</Headline>
            <Paragraph>Bummer dude, couldn&apos;t find that page. Would you like to go <InlineLink type='internal' href='/'>back to the homepage?</InlineLink></Paragraph>
        </Container>
    )
}