import { Paragraph, Code } from 'components/typography';
import { Heading, InlineLink, Item, List } from 'components/typography'
import { Container } from 'components/layout'
import { Button } from 'components/button'
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
					<Form
						name='test-form'
						method='POST'
					>
						<ItemWrapper>
							<Label>First name</Label>
							<Input
								name='first-name'
								type='text'
								placeholder='First name'
							/>
						</ItemWrapper>
						<ItemWrapper>
							<Label>Email</Label>
							<Input
								name='email'
								type='email'
								placeholder='Email address'
							/>
						</ItemWrapper>
						<ItemWrapper>
							<Label>Message</Label>
							<TextArea
								name='email'
								placeholder='Email address'
								rows={4}
							/>
						</ItemWrapper>
						<Button type='submit' variant='primary'>Submit</Button>
					</Form>
				</Container>
			</Container>
		</div>
	);
}
