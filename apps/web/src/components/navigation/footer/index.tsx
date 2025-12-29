import Link from 'next/link';
import styles from './Footer.module.css';
import { Paragraph } from 'components/typography';
import { Avatar } from 'components/avatar';

export const Footer = ({ internalLinks, socialLinks }) => {
	return (
		<footer className={styles.footer}>
			<div className={styles.copyright}>
				<Avatar />
				<Paragraph collapse>
					Copyright &copy; Jory Tindall {new Date().getFullYear()}
				</Paragraph>
			</div>
			<div className={styles.internalLinks}>
				{internalLinks.map((link) => {
					return (
						<Link
							href={link.link}
							key={link._key}
							passHref
							className={styles.link}
						>
							{link.title}
						</Link>
					);
				})}
			</div>
			<div className={styles.externalLinks}>
				{socialLinks.map((link) => {
					return (
						<a
							target="_blank"
							rel="noreferrer"
							href={link.link}
							className={styles.link}
							key={link._key}
						>
							{link.text}
						</a>
					);
				})}
			</div>
		</footer >
	);
};
