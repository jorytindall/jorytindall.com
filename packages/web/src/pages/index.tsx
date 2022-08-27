import { Badge } from 'components/badge'
import { Paragraph, Code } from 'components/typography';
import { Heading, InlineLink, Item, List } from 'components/typography'
import { Container } from 'components/layout'

export default function Home() {
	return (
		<div>
			<Container
				semanticElement='div'
				isFlex={true}
				flexDirection='row'
				density='default'
				justify='center'
				align='center'
			>
				<Heading type='h3'>Heading within the container</Heading>
				<Paragraph type='primary'>Lorem ipsum dolar sit amet.</Paragraph>
				<Badge type='primary' text='Primary badge' />
			</Container>
		</div>
	);
}
