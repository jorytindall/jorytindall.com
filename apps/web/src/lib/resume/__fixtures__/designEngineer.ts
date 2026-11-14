import type { ResumeQueryResult } from '../types';

/**
 * Shaped like a real GET_RESUME_BY_SLUG result for the seeded Design Engineer variant,
 * trimmed to two roles. Tag data is added here to exercise highlight filtering.
 */
export const designEngineer: ResumeQueryResult = {
	_id: 'resume-design-engineer',
	_updatedAt: '2026-11-11T07:30:58Z',
	title: 'Design Engineer',
	slug: 'design-engineer',
	isDefault: true,
	headline: null,
	summary: null,
	profile: {
		_updatedAt: '2026-11-11T07:30:48Z',
		name: 'Jory Tindall',
		label: 'Design Engineer, Product Designer',
		summary: 'Product designer and design engineer crafting enterprise design systems.',
		email: 'me@jorytindall.com',
		website: 'https://jorytindall.com',
		location: { city: 'Seattle', region: 'WA', countryCode: 'US' },
		links: [
			{
				network: 'LinkedIn',
				username: 'jory-tindall',
				url: 'https://www.linkedin.com/in/jory-tindall/',
			},
		],
	},
	experience: [
		{
			highlightTags: null,
			maxHighlights: null,
			role: {
				_id: 'experience-ibm',
				_updatedAt: '2026-11-12T09:00:00Z',
				employer: 'IBM',
				title: 'Lead Product Designer, Helios Design System',
				url: null,
				location: null,
				startDate: '2025-06-01',
				endDate: null,
				current: true,
				summary: null,
				highlights: [
					{ text: 'Helios MCP Server strategy.', tags: ['engineering', 'ai'] },
					{ text: 'Carbon visual language migration.', tags: ['design'] },
					{ text: 'Untagged highlight.', tags: null },
				],
			},
		},
		{
			highlightTags: ['design'],
			maxHighlights: 1,
			role: {
				_id: 'experience-hashicorp',
				_updatedAt: '2026-11-11T07:30:48Z',
				employer: 'HashiCorp',
				title: 'Lead Product Designer, HashiCorp Design System (Helios)',
				url: null,
				location: null,
				startDate: '2022-06-01',
				endDate: '2025-06-01',
				current: false,
				summary: 'Acquired by IBM in February 2025.',
				highlights: [
					{ text: 'Documentation framework.', tags: ['engineering'] },
					{ text: 'Component adoption.', tags: ['Design'] },
					{ text: 'Service-driven model.', tags: ['design'] },
				],
			},
		},
		// A reference to an unpublished role resolves to null and must be skipped.
		{ highlightTags: null, maxHighlights: null, role: null },
	],
	skills: [
		{
			_id: 'skillGroup-ai',
			_updatedAt: '2026-11-11T07:30:48Z',
			name: 'AI',
			items: ['Model Context Protocol (MCP) Servers', 'Agents, Skills, Evaluations'],
		},
		null,
	],
	education: [
		{
			_id: 'education-unc',
			_updatedAt: '2026-11-11T07:30:48Z',
			institution: 'University of Northern Colorado',
			url: null,
			studyType: 'Bachelor of Music',
			area: 'Jazz Studies & Saxophone Performance',
			honors: 'Cum Laude',
			startDate: null,
			endDate: '2012-05-01',
		},
	],
};
