import styles from 'styles/components/PageTitle.module.scss';
import { getClasses } from 'utils/getClasses';

interface PageTitleProps {
	title?: string;
	megaTitle?: string;
}

export const PageTitle = ({ title, megaTitle }: PageTitleProps) => {
	const classes = getClasses([styles['page-title']]);

	return (
		<section className={classes}>
			{title && (
				<p className={styles['title-paragraph']}>
					{title}
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
				</p>
			)}
			{megaTitle && (
				<h1 className={styles['title-headline']}>{megaTitle}</h1>
			)}
		</section>
	);
};
