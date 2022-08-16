import { Mega, H1, H2, H3, H4, H5, H6, Paragraph } from 'components/typography'

export default function Home() {
	return (
		<div>
			<Mega>Mega headline</Mega>
			<H1>Heading 1</H1>
			<H2>Heading 2</H2>
			<H3>Heading 3</H3>
			<H4>Heading 4</H4>
			<H5>Heading 5</H5>
			<H6>Heading 6</H6>
			<Paragraph type='primary'>Lorem ipsum dolar sit amet</Paragraph>
			<Paragraph type='secondary'>Lorem ipsum dolar sit amet</Paragraph>
			<Paragraph type='lead'>Lorem ipsum dolar sit amet</Paragraph>
		</div>
	);
}
