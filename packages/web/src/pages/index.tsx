import { Badge } from 'components/badge'
import { Paragraph, Code } from 'components/typography';
import { Heading, InlineLink, Item, List } from 'components/typography'
import { Container } from 'components/layout'

export default function Home() {
	return (
		<div>
			<Container
				semanticElement='section'
				isFlex={true}
				flexDirection='column'
				density='default'
				justify='start'
				align='normal'
			>
				<Heading type='h1'>Heading within the container</Heading>
				<Paragraph type='primary'>Lorem ipsum dolar sit amet.</Paragraph>
				<Badge type='primary' text='Primary badge' />
			</Container>
		</div>
	);
}
