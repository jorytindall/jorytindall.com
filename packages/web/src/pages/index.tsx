import { Paragraph, Code } from 'components/typography';
import { Heading, InlineLink, Item, List } from 'components/typography'
import { Container } from 'components/layout'
import { Button, ButtonGroup } from 'components/button'
import { Form, Input, Label, TextArea, ItemWrapper } from 'components/form'

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
				<Container
					semanticElement='div'
					flexDirection='column'
					density='packed'
					justify='flex-start'
					align='normal'
					gap='default'
				>
				</Container>
			</Container>
		</div>
	);
}
