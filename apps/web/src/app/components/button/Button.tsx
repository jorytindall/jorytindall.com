import Link from 'next/link';
import styles from 'styles/components/button/Button.module.scss';
import { getClasses } from 'utils/getClasses';

interface ButtonProps {
	children: React.ReactNode;
	href?: string;
	variant?: 'primary' | 'secondary' | 'inverse';
	size?: 'small' | 'default' | 'large';
	type?: 'button' | 'submit' | 'reset';
	isDownload?: boolean;
	isFullWidth?: boolean;
}

export const Button = ({
	children = 'Button text',
	href,
	variant = 'primary',
	size = 'default',
	type,
	isDownload,
	isFullWidth,
}: ButtonProps) => {
	const classes = getClasses([
		styles[variant],
		styles[size],
		isFullWidth ? styles[`full-width`] : null,
	]);

	if (!href) {
		return (
			<button type={type} className={classes}>
				{children}
			</button>
		);
	} else if (href.includes('http')) {
		return (
			<Link href={href} passHref className={classes}>
				{children}
			</Link>
		);
	} else {
		return isDownload ? (
			<a href={href} className={classes} download>
				{children}
			</a>
		) : (
			<a href={href} className={classes}>
				{children}
			</a>
		);
	}
};
