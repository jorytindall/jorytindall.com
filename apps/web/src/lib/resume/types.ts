/**
 * Result shape of the GROQ projection in `lib/queries/resume.ts`. Hand-written: the repo
 * does not run Sanity typegen yet. Keep in step with that projection and with the schemas
 * in `apps/admin/schemas/{documents,objects}/resume/`.
 */

export type ResumeHighlight = {
	text?: string | null;
	tags?: string[] | null;
};

export type ResumeRole = {
	_id: string;
	_updatedAt: string;
	employer?: string | null;
	title?: string | null;
	url?: string | null;
	location?: string | null;
	startDate?: string | null;
	endDate?: string | null;
	current?: boolean | null;
	summary?: string | null;
	highlights?: ResumeHighlight[] | null;
};

export type ResumeExperienceEntry = {
	highlightTags?: string[] | null;
	maxHighlights?: number | null;
	role: ResumeRole | null;
};

export type ResumeSkillGroup = {
	_id: string;
	_updatedAt: string;
	name?: string | null;
	items?: string[] | null;
};

export type ResumeEducation = {
	_id: string;
	_updatedAt: string;
	institution?: string | null;
	url?: string | null;
	studyType?: string | null;
	area?: string | null;
	honors?: string | null;
	startDate?: string | null;
	endDate?: string | null;
};

export type ResumeProfile = {
	_updatedAt: string;
	name?: string | null;
	label?: string | null;
	summary?: string | null;
	email?: string | null;
	website?: string | null;
	location?: {
		city?: string | null;
		region?: string | null;
		countryCode?: string | null;
	} | null;
	links?: { network?: string | null; username?: string | null; url?: string | null }[] | null;
};

export type ResumeQueryResult = {
	_id: string;
	_updatedAt: string;
	title?: string | null;
	slug?: string | null;
	isDefault?: boolean | null;
	headline?: string | null;
	summary?: string | null;
	profile: ResumeProfile | null;
	experience?: ResumeExperienceEntry[] | null;
	skills?: (ResumeSkillGroup | null)[] | null;
	education?: (ResumeEducation | null)[] | null;
};

/** The subset of the JSON Resume schema (https://jsonresume.org/schema) this site emits. */
export type JsonResume = {
	$schema: string;
	basics: {
		name?: string;
		label?: string;
		email?: string;
		url?: string;
		summary?: string;
		location?: { city?: string; region?: string; countryCode?: string };
		profiles?: { network?: string; username?: string; url?: string }[];
	};
	work: {
		name?: string;
		position?: string;
		url?: string;
		location?: string;
		startDate?: string;
		endDate?: string;
		summary?: string;
		highlights?: string[];
	}[];
	education: {
		institution?: string;
		url?: string;
		area?: string;
		studyType?: string;
		startDate?: string;
		endDate?: string;
		score?: string;
	}[];
	skills: { name?: string; keywords?: string[] }[];
	meta: { canonical?: string; version?: string; lastModified?: string };
};
