import { Badge } from 'components/badge'
import { Paragraph, Code } from 'components/typography';
import { Heading } from 'components/typography'
import { InlineLink } from 'components/typography';
import { Item, List } from 'components/typography';

export default function Home() {
	return (
		<div>
			<Heading type='mega'>Heading mega</Heading>
			<Heading type='h1'>Heading 1</Heading>
			<Heading type='h2'>Heading 2</Heading>
			<Heading type='h3'>Heading 3</Heading>
			<Heading type='h4'>Heading 4</Heading>
			<Heading type='h5'>Heading 5</Heading>
			<Heading type='h6'>Heading 6</Heading>
			<Paragraph type='secondary'>Hello, world!</Paragraph>
			<Code>Hello, code!</Code>
			<List type='ul'>
				<Item>Item 1</Item>
				<Item>Item 2</Item>
				<Item>Item 3</Item>
				<Item>Item 4</Item>
			</List>
			<Badge type='primary' text='Primary badge' />
		</div>
	);
}
