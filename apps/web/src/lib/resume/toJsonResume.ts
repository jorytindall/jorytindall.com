import type {
	JsonResume,
	ResumeExperienceEntry,
	ResumeHighlight,
	ResumeQueryResult,
	ResumeRole,
} from './types';

export const JSON_RESUME_SCHEMA_URL =
	'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json';

/** Bump when the shape of the emitted JSON changes in a way consumers would notice. */
export const RESUME_FORMAT_VERSION = 'v1.0.0';

type Options = {
	/** Absolute URL this résumé is served from, for `meta.canonical`. */
	canonical?: string;
};

/** Drop null, undefined, empty strings and empty arrays so optional fields are omitted. */
type Compacted<T> = { [K in keyof T]?: Exclude<T[K], null> };

function isPresent<T>(value: T | null | undefined): value is T {
	return value !== null && value !== undefined;
}

function compact<T extends Record<string, unknown>>(obj: T): Compacted<T> {
	return Object.fromEntries(
		Object.entries(obj).filter(([, value]) => {
			if (value === null || value === undefined || value === '') return false;
			if (Array.isArray(value) && value.length === 0) return false;
			if (typeof value === 'object' && !Array.isArray(value) && !Object.keys(value).length)
				return false;
			return true;
		}),
	) as Compacted<T>;
}

/** `2025-06-01` → `2025-06`. Résumés show month precision; JSON Resume accepts `YYYY-MM`. */
export function toMonth(date?: string | null): string | undefined {
	const match = date?.match(/^(\d{4})-(\d{2})/);
	return match ? `${match[1]}-${match[2]}` : undefined;
}

/**
 * Apply a variant's highlight filter: keep highlights that carry at least one of the
 * entry's tags (all of them when it has none), then apply the optional cap.
 */
export function selectHighlights(
	highlights: ResumeHighlight[] | null | undefined,
	entry: Pick<ResumeExperienceEntry, 'highlightTags' | 'maxHighlights'>,
): string[] {
	const wanted = (entry.highlightTags ?? []).map((tag) => tag.toLowerCase());
	const selected = (highlights ?? [])
		.filter((h) => h?.text)
		.filter(
			(h) =>
				wanted.length === 0 ||
				(h.tags ?? []).some((tag) => wanted.includes(tag.toLowerCase())),
		)
		.map((h) => h.text as string);
	return entry.maxHighlights ? selected.slice(0, entry.maxHighlights) : selected;
}

/** Newest `_updatedAt` across the variant and every document it pulls in. */
export function lastModified(resume: ResumeQueryResult): string {
	const stamps = [
		resume._updatedAt,
		resume.profile?._updatedAt,
		...(resume.experience ?? []).map((e) => e.role?._updatedAt),
		...(resume.skills ?? []).map((s) => s?._updatedAt),
		...(resume.education ?? []).map((e) => e?._updatedAt),
	].filter((stamp): stamp is string => Boolean(stamp));
	return stamps.reduce((latest, stamp) => (stamp > latest ? stamp : latest));
}

/**
 * Map a résumé variant from Sanity onto the JSON Resume schema. Variant headline and
 * summary override the profile's. A current role has no `endDate`, per the schema.
 */
export function toJsonResume(resume: ResumeQueryResult, options: Options = {}): JsonResume {
	const profile = resume.profile ?? ({} as NonNullable<ResumeQueryResult['profile']>);

	const location = profile.location ? compact({ ...profile.location }) : undefined;

	return {
		$schema: JSON_RESUME_SCHEMA_URL,
		basics: compact({
			name: profile.name,
			label: resume.headline || profile.label,
			email: profile.email,
			url: profile.website,
			summary: resume.summary || profile.summary,
			location,
			profiles: (profile.links ?? [])
				.filter((link) => link?.url)
				.map((link) => compact({ ...link })),
		}),
		work: (resume.experience ?? [])
			.filter((entry): entry is ResumeExperienceEntry & { role: ResumeRole } =>
				isPresent(entry?.role),
			)
			.map(({ role, ...entry }) =>
				compact({
					name: role.employer,
					position: role.title,
					url: role.url,
					location: role.location,
					startDate: toMonth(role.startDate),
					endDate: role.current ? undefined : toMonth(role.endDate),
					summary: role.summary,
					highlights: selectHighlights(role.highlights, entry),
				}),
			),
		education: (resume.education ?? []).filter(isPresent).map((edu) =>
			compact({
				institution: edu.institution,
				url: edu.url,
				area: edu.area,
				studyType: edu.studyType,
				startDate: toMonth(edu.startDate),
				endDate: toMonth(edu.endDate),
				score: edu.honors,
			}),
		),
		skills: (resume.skills ?? []).filter(isPresent).map((group) =>
			compact({
				name: group.name,
				keywords: group.items ?? [],
			}),
		),
		meta: compact({
			canonical: options.canonical,
			version: RESUME_FORMAT_VERSION,
			lastModified: lastModified(resume).replace(/\.\d+Z$|Z$/, ''),
		}),
	};
}
