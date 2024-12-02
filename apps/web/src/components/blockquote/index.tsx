import styles from './Blockquote.module.css';

export const Blockquote = ({ text }) => {
	return (
		<aside className={styles.wrapper}>
			<blockquote className={styles.blockquote}>
				&quot;{text}&quot;
			</blockquote>
		</aside>
	);
};
