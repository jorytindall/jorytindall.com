import Link from 'next/link';
import styles from './TextArrow.module.scss';
import { getClasses } from 'utils/getClasses';

interface TextArrowProps {
	href?: string;
	children: React.ReactNode;
}

export const TextArrow = ({ href, children }: TextArrowProps) => {
	const classes = getClasses([styles['text-arrow']]);

	if (!href) {
		return (
			<button className={classes}>
				{children}
				<svg
					width="40"
					height="40"
					viewBox="0 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M19 26.3427V8H21V26.3427C22.65 24.3037 25.1727 23 28 23V25C24.134 25 21 28.134 21 32H19C19 28.134 15.866 25 12 25V23C14.8273 23 17.35 24.3037 19 26.3427Z"
						fill="#005eff"
					/>
				</svg>
			</button>
		);
	} else if (href.includes('http')) {
		return (
			<Link href={href} passHref>
				<a className={classes}>
					{children}
					<svg
						width="40"
						height="40"
						viewBox="0 0 40 40"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19 26.3427V8H21V26.3427C22.65 24.3037 25.1727 23 28 23V25C24.134 25 21 28.134 21 32H19C19 28.134 15.866 25 12 25V23C14.8273 23 17.35 24.3037 19 26.3427Z"
							fill="#005eff"
						/>
					</svg>
				</a>
			</Link>
		);
	} else {
		return (
			<a href={href} className={classes}>
				{children}
				<svg
					width="40"
					height="40"
					viewBox="0 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M19 26.3427V8H21V26.3427C22.65 24.3037 25.1727 23 28 23V25C24.134 25 21 28.134 21 32H19C19 28.134 15.866 25 12 25V23C14.8273 23 17.35 24.3037 19 26.3427Z"
						fill="#005eff"
					/>
				</svg>
			</a>
		);
	}
};
