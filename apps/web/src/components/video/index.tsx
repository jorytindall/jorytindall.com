'use client';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { Paragraph } from 'components/typography';
import styles from './Video.module.css';

interface VideoProps {
	source?: 'youTube' | 'mux';
	youTubeId?: string;
	title?: string;
	description?: string;
}

export const Video = ({ source, youTubeId, title }: VideoProps) => {
	return (
		<article className={styles.wrapper}>
			{source === 'youTube' ? (
				<LiteYouTubeEmbed
					// @ts-ignore
					id={youTubeId}
					// @ts-ignore
					title={title}
				/>
			) : (
				<Paragraph type="secondary">
					Unsupported video source.
				</Paragraph>
			)}
		</article>
	);
};
