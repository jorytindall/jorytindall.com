import Image from 'next/image';
import { getSanityImageUrl } from 'utils/getSanityImage';
import styles from 'styles/components/Person.module.scss';

interface PersonProps {
	name: string;
	instrument?: string;
	image?: string;
}

export const Person = ({ name, instrument, image }: PersonProps) => {
	return (
		<div className={styles.wrapper}>
			<Image
				// @ts-ignore
				src={getSanityImageUrl(image)}
				alt={name}
				width={80}
				height={80}
				className={styles.image}
			/>
			<div className={styles.content}>
				<p className={styles.name}>{name}</p>
				<p className={styles.instrument}>{instrument}</p>
			</div>
		</div>
	);
};
