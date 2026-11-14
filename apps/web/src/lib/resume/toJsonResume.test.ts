import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import schema from '@jsonresume/schema/schema.json';
import { describe, expect, it } from 'vitest';
import { designEngineer } from './__fixtures__/designEngineer';
import { lastModified, selectHighlights, toJsonResume, toMonth } from './toJsonResume';

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

const json = toJsonResume(designEngineer, { canonical: 'https://jorytindall.com/resume.json' });

describe('toJsonResume', () => {
	it('produces a document that validates against the JSON Resume schema', () => {
		const valid = validate(json);
		expect(validate.errors ?? []).toEqual([]);
		expect(valid).toBe(true);
	});

	it('emits only public basics fields', () => {
		// The dataset is public, but this guards the output too: a new field must be added
		// here on purpose, not leak in because someone widened a projection.
		expect(Object.keys(json.basics).sort()).toEqual(
			['email', 'label', 'location', 'name', 'profiles', 'summary', 'url'].sort(),
		);
		const keys: string[] = [];
		JSON.stringify(json, (key, value) => (keys.push(key), value));
		expect(keys).not.toEqual(expect.arrayContaining(['phone']));
		expect(keys).not.toEqual(expect.arrayContaining(['address']));
		expect(keys).not.toEqual(expect.arrayContaining(['postalCode']));
	});

	it('uses month precision and omits endDate for a current role', () => {
		expect(json.work[0]).toMatchObject({ name: 'IBM', startDate: '2025-06' });
		expect(json.work[0]).not.toHaveProperty('endDate');
		expect(json.work[1]).toMatchObject({ startDate: '2022-06', endDate: '2025-06' });
		expect(json.education[0]).toMatchObject({ endDate: '2012-05', score: 'Cum Laude' });
	});

	it('skips unresolved references and empty values', () => {
		expect(json.work).toHaveLength(2);
		expect(json.skills).toHaveLength(1);
		expect(json.work[0]).not.toHaveProperty('url');
		expect(json.work[0]).not.toHaveProperty('summary');
	});

	it('lets a variant override the profile headline and summary', () => {
		const overridden = toJsonResume({
			...designEngineer,
			headline: 'Design Engineer',
			summary: 'Variant summary.',
		});
		expect(overridden.basics.label).toBe('Design Engineer');
		expect(overridden.basics.summary).toBe('Variant summary.');
		expect(json.basics.label).toBe('Design Engineer, Product Designer');
	});

	it('records the newest update across all referenced documents', () => {
		expect(lastModified(designEngineer)).toBe('2026-11-12T09:00:00Z');
		expect(json.meta.lastModified).toBe('2026-11-12T09:00:00');
		expect(json.meta.canonical).toBe('https://jorytindall.com/resume.json');
	});
});

describe('selectHighlights', () => {
	const highlights = designEngineer.experience?.[1]?.role?.highlights;

	it('keeps every highlight when the entry has no tags or cap', () => {
		expect(json.work[0].highlights).toHaveLength(3);
	});

	it('filters by tag, case-insensitively, then applies the cap', () => {
		expect(selectHighlights(highlights, { highlightTags: ['design'] })).toEqual([
			'Component adoption.',
			'Service-driven model.',
		]);
		expect(json.work[1].highlights).toEqual(['Component adoption.']);
	});

	it('drops highlights with no text', () => {
		expect(selectHighlights([{ text: '' }, { text: 'Kept.' }], {})).toEqual(['Kept.']);
	});
});

describe('toMonth', () => {
	it('truncates to YYYY-MM and tolerates missing input', () => {
		expect(toMonth('2020-07-01')).toBe('2020-07');
		expect(toMonth(null)).toBeUndefined();
		expect(toMonth('not a date')).toBeUndefined();
	});
});
