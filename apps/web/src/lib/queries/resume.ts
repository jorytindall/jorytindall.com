import { groq } from 'next-sanity';

/**
 * Résumé queries. Every field here is safe to publish — the dataset is public, so nothing
 * private belongs in these documents in the first place (see apps/admin résumé schemas).
 *
 * Highlight filtering (a variant's `highlightTags` and `maxHighlights`) is deliberately
 * left to `toJsonResume` rather than done in GROQ, so it can be unit-tested.
 *
 * Each projected document carries `_updatedAt`, so callers can derive one Last-Modified /
 * ETag value for the whole résumé from the newest of them.
 */
const RESUME_PROJECTION = groq`{
	_id,
	_updatedAt,
	title,
	"slug": slug.current,
	isDefault,
	headline,
	summary,
	"profile": *[_type == 'resumeProfile' && _id == 'resumeProfile'][0] {
		_updatedAt,
		name,
		label,
		summary,
		email,
		website,
		location { city, region, countryCode },
		links[] { network, username, url },
	},
	"experience": experience[defined(experience->_id)] {
		highlightTags,
		maxHighlights,
		"role": experience-> {
			_id,
			_updatedAt,
			employer,
			title,
			url,
			location,
			startDate,
			endDate,
			current,
			summary,
			highlights[] { text, tags },
		},
	},
	"skills": skills[]-> { _id, _updatedAt, name, items },
	"education": education[]-> {
		_id,
		_updatedAt,
		institution,
		url,
		studyType,
		area,
		honors,
		startDate,
		endDate,
	},
}`;

/** One variant by `$slug`, e.g. `design-engineer`. Null when the slug is unknown.
 * Named to match the other single-document queries (`GET_TALKS`, `GET_PAGES`, …). */
export const GET_RESUMES = groq`
	*[_type == 'resume' && slug.current == $slug][0] ${RESUME_PROJECTION}
`;

/** The variant marked default. The schema allows only one; newest wins if that slips. */
export const GET_DEFAULT_RESUME = groq`
	*[_type == 'resume' && isDefault == true] | order(_updatedAt desc)[0] ${RESUME_PROJECTION}
`;

/** Slugs of every variant, for static params and the variant list. */
export const GET_RESUME_PATHS = groq`
	*[_type == 'resume' && defined(slug.current)] | order(title asc).slug.current
`;
