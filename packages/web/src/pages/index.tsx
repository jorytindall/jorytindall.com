import { Badge } from 'components/badge'
import { Paragraph } from 'components/typography';
import { Heading } from 'components/typography'

export default function Home() {
	return (
		<div>
			<Heading type='h1'>Heading text</Heading>
			<Paragraph type='secondary'>Hello, world!</Paragraph>
			{/* <Badge text='Badge text' type='primary' /> */}
		</div>
	);
}
