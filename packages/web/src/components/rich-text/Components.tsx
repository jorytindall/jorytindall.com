import {
	Headline,
	Paragraph,
	Code,
	InlineLink,
	List,
	Item,
} from 'components/typography';
import { Blockquote } from 'components/blockquote';
import { CodeBlock } from 'components/code';

interface BlockProps {
	children?: React.ReactNode;
}

interface MarkProps {
	children?: React.ReactNode;
	value?: any;
}

interface TypeProps {
	value?: any;
}

export const Components = {
	block: {
		h1: ({ children }: BlockProps) => (
			<Headline type="h1">{children}</Headline>
		),
		h2: ({ children }: BlockProps) => (
			<Headline type="h2">{children}</Headline>
		),
		h3: ({ children }: BlockProps) => (
			<Headline type="h3">{children}</Headline>
		),
		h4: ({ children }: BlockProps) => (
			<Headline type="h4">{children}</Headline>
		),
		h5: ({ children }: BlockProps) => (
			<Headline type="h5">{children}</Headline>
		),
		h6: ({ children }: BlockProps) => (
			<Headline type="h6">{children}</Headline>
		),
		normal: ({ children }: BlockProps) => (
			<Paragraph type="primary">{children}</Paragraph>
		),
		blockquote: ({ children }: BlockProps) => (
			<Blockquote text={children} />
		),
	},
	list: {
		bullet: ({ children }: BlockProps) => <List type="ul">{children}</List>,
		number: ({ children }: BlockProps) => <List type="ol">{children}</List>,
	},
	listItem: {
		bullet: ({ children }: BlockProps) => <Item>{children}</Item>,
	},
	marks: {
		internalLink: ({ value, children }: MarkProps) => (
			<InlineLink type="primary" href={value}>
				{children}
			</InlineLink>
		),
		code: ({ children }: MarkProps) => <Code>{children}</Code>,
	},
	types: {
		codeBlock: ({ value }: TypeProps) => (
			<CodeBlock
				code={value.code.code}
				language={value.language}
				description={value.description}
			/>
		),
		mainImage: ({ value }: TypeProps) => <p>This is an image</p>,
	},
};
