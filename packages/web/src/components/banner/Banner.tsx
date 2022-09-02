import Link from 'next/link'
import styles from './Banner.module.scss';
import { RichText } from 'components/rich-text';
import { linkResolver } from 'utils/linkResolver';

interface BannerProps {
	content: any,
	target: 'none' | 'internal' | 'external',
	href?: string,
}

export const Banner = ({ content, target, href }: BannerProps) => {
	return (
		<aside className={styles.banner}>
			<RichText value={content} />
		</aside>
	)
};
