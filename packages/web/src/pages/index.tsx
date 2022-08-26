import { Badge } from 'components/badge'
import { Paragraph } from 'components/typography';
import { Heading } from 'components/typography'
import { InlineLink } from 'components/typography';

export default function Home() {
	return (
		<div>
			<Heading type='h1'>Heading text</Heading>
			<Paragraph type='secondary'>Hello, world!</Paragraph>
			<InlineLink href='about' type='internal' variant='primary'>Link text</InlineLink>
			<Badge type='primary' text='Primary badge' />
		</div>
	);
}
