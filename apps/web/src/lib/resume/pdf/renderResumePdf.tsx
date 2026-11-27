import { renderToBuffer } from '@react-pdf/renderer';
import type { JsonResume } from '../types';
import { configureFonts } from './fonts';
import { ResumeDocument } from './ResumeDocument';

/**
 * Count pages in a PDF produced by react-pdf. Its writer (pdfkit) emits each page as a
 * plain `/Type /Page` dictionary, never inside a compressed object stream, so a pattern
 * match is reliable here — it is not a general-purpose PDF parser.
 */
export function countPages(pdf: Buffer): number {
	return pdf.toString('latin1').match(/\/Type\s*\/Page(?![a-zA-Z])/g)?.length ?? 0;
}

export class ResumeOverflowError extends Error {
	constructor(public readonly pages: number) {
		super(`Résumé renders to ${pages} pages; it must fit on one.`);
		this.name = 'ResumeOverflowError';
	}
}

/**
 * Render a résumé to a PDF buffer. Throws `ResumeOverflowError` when the content runs past
 * one page, so an over-long variant fails loudly instead of shipping a two-page PDF.
 */
export async function renderResumePdf(
	resume: JsonResume,
	options: { portfolioUrl?: string } = {},
): Promise<Buffer> {
	configureFonts();
	const pdf = await renderToBuffer(
		<ResumeDocument resume={resume} portfolioUrl={options.portfolioUrl} />,
	);
	const pages = countPages(pdf);
	if (pages !== 1) throw new ResumeOverflowError(pages);
	return pdf;
}
