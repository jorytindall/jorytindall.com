import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/components/Avatar.module.scss';

export const Avatar = () => {
	return (
		<Link href="/" passHref>
			<div className={styles.avatar}>
				<Image
					src='/avatar-logo.png'
					width={60}
					height={60}
					quality={90}
					priority={true}
					alt="Photo of Jory Tindall"
				/>
			</div>
		</Link>
	);
};
