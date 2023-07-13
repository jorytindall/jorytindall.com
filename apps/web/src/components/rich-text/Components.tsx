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
import { Playlist } from 'components/audio'
import { Video } from 'components/video'

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
			<Headline tag="h1">{children}</Headline>
		),
		h2: ({ children }: BlockProps) => (
			<Headline tag="h2">{children}</Headline>
		),
		h3: ({ children }: BlockProps) => (
			<Headline tag="h3">{children}</Headline>
		),
		h4: ({ children }: BlockProps) => (
			<Headline tag="h4">{children}</Headline>
		),
		h5: ({ children }: BlockProps) => (
			<Headline tag="h5">{children}</Headline>
		),
		h6: ({ children }: BlockProps) => (
			<Headline tag="h6">{children}</Headline>
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
		playlist: ({ value }: TypeProps) => (
			<Playlist
				tracks={value.tracks}
			/>
		),
		video: ({ value}: TypeProps) => (
			<Video
				title={value.title}
				source={value.source}
				youTubeId={value.youTubeId}
			/>
		)
	},
};
