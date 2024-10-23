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

	if (link.type === 'internal') {
			return (
				<Link href={linkResolver(link.internalLink._type, link.internalLink.slug)} className={styles.banner}>
					<Paragraph type='secondary' color='primary' collapse><strong>{title}</strong></Paragraph>
					<RichText value={content} />
				</Link>
			)
	} else if (link.type === 'customInternal') {
		return (
			<Link href={link.customLink} className={styles.banner}>
				<Paragraph type='secondary' color='primary' collapse><strong>{title}</strong></Paragraph>
				<RichText value={content} />
			</Link>
		)
	} else if (link.type === 'external') {
		return (
			<a href={link.externalLink} target={link.target} className={styles.banner}>
				<Paragraph type='secondary' color='primary' collapse><strong>{title}</strong></Paragraph>
				<RichText value={content} />
			</a>
		)
	} else {
		return null
	}
};
