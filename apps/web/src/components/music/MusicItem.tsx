import Link from 'next/link';
import Image from 'next/image';
import { getSanityImageUrl } from 'utils/getSanityImage';
import { linkResolver } from 'utils/linkResolver';
import styles from './MusicItem.module.css';

interface MusicItemProps {
	title: string;
	description?: string;
	image?: any;
	link: string;
}

export const MusicItem = ({
	title,
	description,
	image,
	link,
}: MusicItemProps) => {

	console.log(title)
	return (
		<Link
			href={linkResolver('musicProject', link)}
			className={styles.wrapper}
		>
			{image && (
				<div className={styles.imageWrapper}>
					<Image
						// @ts-ignore
						src={getSanityImageUrl(image)}
						alt={image.alternativeText || 'Music project image'}
						className={styles.featureImage}
						fill
					/>
				</div>
			)}
			<div className={styles.content}>
				<h3>{title}</h3>
				{description && <p>{description}</p>}
			</div>
		</Link>
	);
};
