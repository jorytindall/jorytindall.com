import Link from 'next/link';
import styles from 'styles/components/navigation/Footer.module.scss';
import { Paragraph } from 'app/components/typography';
import { internalLinks, externalLinks } from './Links';
import { Avatar } from 'app/components/avatar';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.copyright}>
				<Avatar />
				<Paragraph collapse>
					Copyright &copy; Jory Tindall {new Date().getFullYear()}
				</Paragraph>
			</div>
			<div className={styles['internal-links']}>
				{internalLinks.map((link) => {
					return (
						<Link
							href={link.slug}
							key={link.text}
							passHref
							className={styles.link}
						>
							{link.text}
						</Link>
					);
				})}
			</div>
			<div className={styles['external-links']}>
				{externalLinks.map((link) => {
					return (
						<a
							target="_blank"
							rel="noreferrer"
							href={link.href}
							className={styles.link}
							key={link.text}
						>
							{link.text}
						</a>
					);
				})}
			</div>
		</footer>
	);
};
