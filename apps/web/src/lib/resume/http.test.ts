import { describe, expect, it, vi } from 'vitest';
import { designEngineer } from './__fixtures__/designEngineer';
import { createResumeResponder, etagFor, parseResumeFile, type ResumeLoaders } from './http';
import { ResumeOverflowError } from './pdf/renderResumePdf';
import { toJsonResume } from './toJsonResume';

const json = toJsonResume(designEngineer);
const lastModified = '2026-11-12T09:00:00Z';
const pdfBytes = Buffer.from('%PDF-1.3 fake');

function setup(overrides: Partial<ResumeLoaders> = {}) {
	const loaders: ResumeLoaders = {
		slugs: vi.fn(async () => ['design-engineer']),
		json: vi.fn(async (slug) =>
			slug === null || slug === 'design-engineer'
				? { slug: 'design-engineer', json, lastModified }
				: null,
		),
		pdf: vi.fn(async (slug) =>
			slug === null || slug === 'design-engineer'
				? {
						slug: 'design-engineer',
						pdf: pdfBytes,
						lastModified,
						fileName: 'Jory-Tindall-Resume.pdf',
					}
				: null,
		),
		...overrides,
	};
	return { loaders, responder: createResumeResponder(loaders, 'v1.0.0') };
}

const get = (path: string, headers: Record<string, string> = {}) =>
	new Request(`https://jorytindall.com${path}`, { headers });

describe('parseResumeFile', () => {
	it('splits slug and format', () => {
		expect(parseResumeFile('design-engineer.pdf')).toEqual({
			slug: 'design-engineer',
			format: 'pdf',
		});
		expect(parseResumeFile('general.json')).toEqual({ slug: 'general', format: 'json' });
	});

	it('rejects anything that is not a plain slug with a known extension', () => {
		for (const bad of ['design-engineer', 'x.docx', '.pdf', '../x.pdf', 'A.pdf', 'a--b.pdf']) {
			expect(parseResumeFile(bad)).toBeNull();
		}
	});
});

describe('PDF responses', () => {
	it('serves the default variant inline with caching headers', async () => {
		const { responder, loaders } = setup();
		const res = await responder.pdf(null, get('/resume.pdf'));
		expect(res.status).toBe(200);
		expect(loaders.pdf).toHaveBeenCalledWith(null);
		expect(res.headers.get('content-type')).toBe('application/pdf');
		expect(res.headers.get('content-disposition')).toBe(
			'inline; filename="Jory-Tindall-Resume.pdf"',
		);
		expect(res.headers.get('cache-control')).toContain('s-maxage=3600');
		expect(res.headers.get('last-modified')).toBe('Thu, 12 Nov 2026 09:00:00 GMT');
		expect(res.headers.get('etag')).toBe(
			etagFor('design-engineer', 'pdf', lastModified, 'v1.0.0'),
		);
		expect(Buffer.from(await res.arrayBuffer())).toEqual(pdfBytes);
	});

	it('forces a download with ?download=1', async () => {
		const { responder } = setup();
		const res = await responder.pdf(null, get('/resume.pdf?download=1'));
		expect(res.headers.get('content-disposition')).toMatch(/^attachment;/);
	});

	it('answers 304 when the ETag still matches', async () => {
		const { responder } = setup();
		const etag = etagFor('design-engineer', 'pdf', lastModified, 'v1.0.0');
		const res = await responder.pdf(null, get('/resume.pdf', { 'if-none-match': `W/${etag}` }));
		expect(res.status).toBe(304);
		expect(await res.text()).toBe('');
	});

	it('404s when there is no default variant', async () => {
		const { responder } = setup({ pdf: async () => null });
		expect((await responder.pdf(null, get('/resume.pdf'))).status).toBe(404);
	});

	it('500s, uncached, when the content overflows one page', async () => {
		const error = vi.spyOn(console, 'error').mockImplementation(() => {});
		const { responder } = setup({
			pdf: async () => {
				throw new ResumeOverflowError(2);
			},
		});
		const res = await responder.pdf(null, get('/resume.pdf'));
		expect(res.status).toBe(500);
		expect(res.headers.get('cache-control')).toBe('no-store');
		expect(error).toHaveBeenCalled();
		error.mockRestore();
	});
});

describe('JSON responses', () => {
	it('serves JSON Resume with CORS open', async () => {
		const { responder } = setup();
		const res = await responder.json(null, get('/resume.json'));
		expect(res.status).toBe(200);
		expect(res.headers.get('content-type')).toBe('application/json; charset=utf-8');
		expect(res.headers.get('access-control-allow-origin')).toBe('*');
		expect(await res.json()).toEqual(json);
	});

	it('uses a different ETag from the PDF', async () => {
		const { responder } = setup();
		const pdf = await responder.pdf(null, get('/resume.pdf'));
		const js = await responder.json(null, get('/resume.json'));
		expect(pdf.headers.get('etag')).not.toBe(js.headers.get('etag'));
	});
});

describe('named variants', () => {
	it('routes by extension', async () => {
		const { responder, loaders } = setup();
		expect(
			(await responder.file('design-engineer.pdf', get('/'))).headers.get('content-type'),
		).toBe('application/pdf');
		expect(loaders.pdf).toHaveBeenCalledWith('design-engineer');
		expect(
			(await responder.file('design-engineer.json', get('/'))).headers.get('content-type'),
		).toMatch(/^application\/json/);
	});

	it('404s an unknown slug without loading it', async () => {
		const { responder, loaders } = setup();
		const res = await responder.file('nope.pdf', get('/resume/nope.pdf'));
		expect(res.status).toBe(404);
		expect(loaders.pdf).not.toHaveBeenCalled();
		expect(loaders.json).not.toHaveBeenCalled();
	});

	it('404s a malformed file name without consulting Sanity', async () => {
		const { responder, loaders } = setup();
		expect((await responder.file('design-engineer.docx', get('/'))).status).toBe(404);
		expect(loaders.slugs).not.toHaveBeenCalled();
	});
});
