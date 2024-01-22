import {
	Headline,
	Paragraph,
	Code,
	InlineLink,
	List,
	Item,
} from 'app/components/typography';
import { Blockquote } from 'app/components/blockquote';
import { CodeBlock } from 'app/components/code';
import { Playlist } from 'app/components/audio';
import { Video } from 'app/components/video';
import { DownloadButton } from 'app/components/button';

import s from 'styles/components/RichText.module.scss'

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
			<Paragraph type="secondary">{children}</Paragraph>
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
		playlist: ({ value }: TypeProps) => <Playlist tracks={value.tracks} />,
		video: ({ value }: TypeProps) => (
			<Video
				title={value.title}
				source={value.source}
				youTubeId={value.youTubeId}
			/>
		),
		fileDownload: ({ value }: TypeProps) => (
			<DownloadButton
				text={value.text}
				href={value.file.asset._ref}
				className={s['rich-text-button']}
			/>
		)
	},
};
