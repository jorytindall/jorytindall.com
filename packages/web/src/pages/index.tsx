import { Badge } from 'components/badge'
import { Paragraph, Code } from 'components/typography';
import { Heading, InlineLink, Item, List } from 'components/typography'
import { Container } from 'components/layout'

export default function Home() {
	return (
		<div>
			<Container semanticElement='div'>
				<Heading type='h3'>Heading within the container</Heading>
				<Paragraph>Lorem ipsum dolar sit amet.</Paragraph>
				<Badge type='primary' text='Primary badge' />
				<Badge type='secondary' text='Secondary badge' />
				<Badge type='tertiary' text='Tertiary badge' />
			</Container>
		</div>
	);
}