import { Badge } from 'components/badge'
import { Paragraph, Code } from 'components/typography';
import { Heading, InlineLink, Item, List } from 'components/typography'
import { Container } from 'components/layout'
import { Button } from 'components/button'

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
				<Button
					variant='secondary'
					size='small'
				>Small button</Button>
				<Button
					variant='secondary'
					size='default'
					href='https://google.com'
				>Default button</Button>
				<Button
					variant='secondary'
					size='large'
					href='/contact'
				>Large button</Button>
				<Badge type='primary' text='Primary badge' />
			</Container>
		</div>
	);
}
