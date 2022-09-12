import Link from 'next/link';
import styles from 'styles/components/typography/InlineLink.module.scss';

interface LinkProps {
	type: string;
	href: string;
	children: React.ReactNode;
	target?: '_self' | '_blank' | '_parent' | '_top';
	rel?: string;
	variant?: 'primary' | 'secondary' | 'tertiary';
}

export const InlineLink = ({
	children,
	type,
	href,
	target = '_blank',
	rel,
	variant = 'primary',
}: LinkProps) => {
	switch (type) {
		case 'internal':
			return (
				<Link href={href} passHref>
					<a
						className={[
							styles.link,
							styles[`link--${variant}`],
						].join(' ')}
					>
						{children}
					</a>
				</Link>
			);
		case 'external':
			return (
				<a
					href={href}
					target={target}
					rel={rel}
					className={[styles.link, styles[`link--${variant}`]].join(
						' '
					)}
				>
					{children}
				</a>
			);
		default:
			return (
				<a
					href={href}
					target={target}
					rel={rel}
					className={[styles.link, styles[`link--${variant}`]].join(
						' '
					)}
				>
					{children}
				</a>
			);
	}
};
