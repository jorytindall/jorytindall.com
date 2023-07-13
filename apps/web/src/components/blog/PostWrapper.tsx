import Link from 'next/link';
import { Headline, Paragraph } from 'components/typography';
import styles from 'styles/components/blog/PostWrapper.module.scss';

interface PostWrapperProps {
	title: string;
	excerpt: string;
	link: string;
}

export const PostWrapper = ({ title, excerpt, link }: PostWrapperProps) => {
	return (
		<article className={styles.wrapper}>
			<Link href={link}>
				<Headline tag="h4" collapse>
					{title}
				</Headline>
				<Paragraph>{excerpt}</Paragraph>
			</Link>
		</article>
	);
};
