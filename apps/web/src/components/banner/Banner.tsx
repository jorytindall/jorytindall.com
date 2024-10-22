import Link from 'next/link';
import styles from 'styles/components/Banner.module.scss';
import { RichText } from 'components/rich-text';
import { Paragraph } from 'components/typography';
import { linkResolver } from 'utils/linkResolver';

interface BannerProps {
	content?: any;
	title?: string
	link?: any;
}

export const Banner = ({
	content,
	title,
	link,
}: BannerProps) => {

	console.log(link)

	if (link) {
		return (
			<Link href='#' className={styles.banner}>
				<Paragraph type='secondary' color='primary' collapse><strong>{title}</strong></Paragraph>
				<RichText value={content} />
			</Link>
		)
	} else {
		return (
			<aside className={styles.banner}>
				<Paragraph type='secondary' color='primary' collapse><strong>{title}</strong></Paragraph>
				<RichText value={content} />
			</aside>
		)
	}
};
