'use client';

import { usePathname } from 'next/navigation';
import { Paragraph } from 'components/typography';
import styles from './DraftModeBanner.module.css';

/**
 * Shown on every page while draft mode is on, so an editor is never unsure whether they
 * are looking at published content or their own unpublished edits.
 */
export const DraftModeBanner = () => {
	const pathname = usePathname();

	return (
		<aside className={styles.banner} aria-label="Draft preview">
			<Paragraph type="secondary" collapse className={styles.text}>
				<strong>Previewing drafts.</strong> Visitors still see the published page.
			</Paragraph>
			{/* A plain anchor, not `next/link`: leaving preview has to be a full document
			    request so the route clears the cookie and the page re-renders from
			    published content. A client-side navigation would keep the stale tree. */}
			<a
				className={styles.exit}
				href={`/api/draft/disable?path=${encodeURIComponent(pathname)}`}
			>
				Exit preview
			</a>
		</aside>
	);
};
