import { useCallback, useState } from 'react';
import { BiShow } from 'react-icons/bi';
import { useToast } from '@sanity/ui';
import { useClient, useCurrentUser } from 'sanity';
import type { DocumentActionComponent } from 'sanity';
import { createPreviewSecret } from '@sanity/preview-url-secret/create-secret';
import {
	urlSearchParamPreviewPathname,
	urlSearchParamPreviewSecret,
} from '@sanity/preview-url-secret/constants';

import { DRAFT_MODE_ENABLE_ROUTE, PREVIEW_URL } from '../previewConfig';
import { resolvePreviewPath } from '../utils/previewPath';

/**
 * "Open preview" — opens the document's page on the website, in a new top-level tab,
 * with draft mode on.
 *
 * This is the preview path that does not depend on the Presentation tool's iframe, so it
 * keeps working regardless of how a browser treats third-party cookies: the tab is a
 * first-party visit to the site.
 *
 * Each click mints a fresh secret in the dataset, as the signed-in editor, valid for an
 * hour. The website validates it server-side before enabling draft mode, so the link is
 * not a permanent key and nothing secret ships in this bundle.
 */
export const OpenPreviewAction: DocumentActionComponent = (props) => {
	const { draft, published, type, onComplete } = props;

	// Hooks first and unconditionally — this component returns `null` for document types
	// that have no route, and that early return must not change the hook order.
	const client = useClient({ apiVersion: '2023-05-03' });
	const currentUser = useCurrentUser();
	const toast = useToast();
	const [isOpening, setIsOpening] = useState(false);

	const doc = draft || published;
	const slug = (doc?.slug as { current?: string } | undefined)?.current;
	const previewPath = resolvePreviewPath(type, slug);

	const handle = useCallback(async () => {
		if (!previewPath) {
			return;
		}

		// Opened synchronously, before any await: a `window.open` that happens after a
		// promise resolves is no longer tied to the click and popup blockers eat it.
		const tab = window.open('about:blank', '_blank', 'noopener,noreferrer');

		setIsOpening(true);

		try {
			const { secret } = await createPreviewSecret(
				client,
				'document-action',
				window.location.origin,
				currentUser?.id,
			);

			const url = new URL(`${PREVIEW_URL}${DRAFT_MODE_ENABLE_ROUTE}`);
			url.searchParams.set(urlSearchParamPreviewSecret, secret);
			url.searchParams.set(urlSearchParamPreviewPathname, previewPath);

			if (tab) {
				tab.location.href = url.toString();
			} else {
				// The popup was blocked, so fall back to navigating this tab.
				window.location.href = url.toString();
			}
		} catch (error) {
			tab?.close();
			toast.push({
				status: 'error',
				title: 'Could not open preview',
				description: error instanceof Error ? error.message : String(error),
			});
		} finally {
			setIsOpening(false);
			onComplete();
		}
	}, [client, currentUser?.id, onComplete, previewPath, toast]);

	// Nothing sensible to open for a type with no route, or a document with no slug yet.
	if (!previewPath) {
		return null;
	}

	return {
		label: isOpening ? 'Opening preview…' : 'Open preview',
		icon: BiShow,
		disabled: isOpening,
		onHandle: handle,
	};
};
