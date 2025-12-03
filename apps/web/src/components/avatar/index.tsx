import Image from 'next/image';
import Link from 'next/link';
import styles from './Avatar.module.css';

export const Avatar = ({
	width = 60,
	height = 60,
}) => {
	return (
		<Link href="/" className={styles.avatar} style={{ width: width + 2, height: height + 2 }} passHref>
			<div>
				<Image
					src='/avatar-logo.png'
					width={width}
					height={height}
					priority={true}
					alt="Photo of Jory Tindall"
				/>
			</div>
		</Link>
	);
};
