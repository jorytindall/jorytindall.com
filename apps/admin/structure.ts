import { BiIdCard, BiSpreadsheet } from 'react-icons/bi';
import type { StructureResolver } from 'sanity/structure';

/** Document types grouped under "Résumé" instead of the top-level list. */
export const RESUME_TYPES = ['resumeProfile', 'resume', 'experience', 'skillGroup', 'education'];

/** Singleton types: one fixed document each, no create or delete. */
export const SINGLETON_TYPES = new Set(['resumeProfile']);

export const structure: StructureResolver = (S) =>
	S.list()
		.title('Content')
		.items([
			...S.documentTypeListItems().filter(
				(item) => !RESUME_TYPES.includes(item.getId() ?? ''),
			),
			S.divider(),
			S.listItem()
				.title('Résumé')
				.icon(BiSpreadsheet)
				.child(
					S.list()
						.title('Résumé')
						.items([
							S.listItem()
								.title('Profile')
								.icon(BiIdCard)
								.child(
									S.document()
										.schemaType('resumeProfile')
										.documentId('resumeProfile'),
								),
							S.documentTypeListItem('resume').title('Variants'),
							S.divider(),
							S.documentTypeListItem('experience').title('Experience'),
							S.documentTypeListItem('skillGroup').title('Skill Groups'),
							S.documentTypeListItem('education').title('Education'),
						]),
				),
		]);
