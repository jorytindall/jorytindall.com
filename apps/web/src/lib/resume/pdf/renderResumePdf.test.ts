import { describe, expect, it } from 'vitest';
import full from '../__fixtures__/designEngineerFull.json';
import { designEngineer } from '../__fixtures__/designEngineer';
import { toJsonResume } from '../toJsonResume';
import type { ResumeQueryResult } from '../types';
import { formatMonth, formatRange, displayUrl } from './format';
import { countPages, renderResumePdf, ResumeOverflowError } from './renderResumePdf';

// Rendering takes a few hundred milliseconds; give CI headroom.
const TIMEOUT = 30_000;

const fullResume = toJsonResume(full as ResumeQueryResult);

describe('renderResumePdf', () => {
	it(
		'fits the real Design Engineer content on one page',
		async () => {
			// designEngineerFull.json is a snapshot of the real variant (Nov 2026). It is the
			// one-page budget's regression check: if the template grows, this fails first.
			const pdf = await renderResumePdf(fullResume);
			expect(countPages(pdf)).toBe(1);
			expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
		},
		TIMEOUT,
	);

	it(
		'renders the trimmed fixture too',
		async () => {
			const pdf = await renderResumePdf(toJsonResume(designEngineer));
			expect(countPages(pdf)).toBe(1);
		},
		TIMEOUT,
	);

	it(
		'refuses to produce a second page',
		async () => {
			const tooLong = {
				...fullResume,
				work: [...fullResume.work, ...fullResume.work],
			};
			const error = await renderResumePdf(tooLong).catch((e: unknown) => e);
			expect(error).toBeInstanceOf(ResumeOverflowError);
			expect((error as ResumeOverflowError).pages).toBeGreaterThan(1);
		},
		TIMEOUT,
	);

	it(
		'sets document metadata',
		async () => {
			const pdf = (await renderResumePdf(fullResume)).toString('latin1');
			// pdfkit writes Info strings as literals; non-ASCII ones (the é) as UTF-16BE with a BOM.
			const utf16 = (text: string) =>
				'(\u00fe\u00ff' + Buffer.from(text, 'utf16le').swap16().toString('latin1') + ')';
			expect(pdf).toContain(utf16('Jory Tindall — Résumé'));
			expect(pdf).toContain('(Jory Tindall)');
		},
		TIMEOUT,
	);
});

describe('countPages', () => {
	it('counts page objects and ignores the /Pages tree node', () => {
		const fake = Buffer.from(
			'<< /Type /Pages /Count 2 >> << /Type /Page >> << /Type/Page/Parent 1 0 R >>',
			'latin1',
		);
		expect(countPages(fake)).toBe(2);
	});
});

describe('format', () => {
	it('formats JSON Resume dates for display', () => {
		expect(formatMonth('2025-06')).toBe('Jun 2025');
		expect(formatMonth('2012')).toBe('2012');
		expect(formatRange('2025-06')).toBe('Jun 2025 – Present');
		expect(formatRange('2022-06', '2025-06')).toBe('Jun 2022 – Jun 2025');
		expect(formatRange(undefined, '2012-05')).toBe('May 2012');
	});

	it('shortens URLs for display', () => {
		expect(displayUrl('https://www.linkedin.com/in/jory-tindall/')).toBe(
			'linkedin.com/in/jory-tindall',
		);
	});
});
