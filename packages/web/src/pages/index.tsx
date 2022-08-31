import { Badge } from 'components/badge'
import { Paragraph, Code } from 'components/typography';
import { Heading, InlineLink, Item, List } from 'components/typography'
import { Container } from 'components/layout'
import { Button, TextArrow } from 'components/button'

export default function Home() {
	return (
		<div>
			<Container
				semanticElement='section'
				flexDirection='column'
				density='default'
				justify='flex-start'
				align='normal'
				gap='extra-large'
			>
				<Heading type='h1' collapse>Heading within the container</Heading>
				<Paragraph type='primary' collapse>Lorem ipsum dolar sit amet.</Paragraph>
				<TextArrow>Button text arrow</TextArrow>
				<TextArrow href='https://google.com'>Link text arrow</TextArrow>
				<TextArrow href='/contact'>Internal link arrow</TextArrow>
				<Badge type='primary' text='Primary badge' />
			</Container>
		</div>
	);
}
