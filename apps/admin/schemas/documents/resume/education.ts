import { BiBook } from 'react-icons/bi';
import { defineType } from 'sanity';
import { formatDateRange } from '../../../utils/resumeDates';

/** A school or programme. Maps to a JSON Resume `education[]` entry. */
export default defineType({
	name: `education`,
	title: `Education`,
	type: `document`,
	icon: BiBook,
	fields: [
		{
			name: `institution`,
			title: `Institution`,
			type: `string`,
			validation: (Rule) => Rule.required().error(`Add the institution.`),
		},
		{
			name: `url`,
			title: `Institution URL`,
			type: `url`,
		},
		{
			name: `studyType`,
			title: `Study Type`,
			type: `string`,
			description: `Example: Bachelor of Music.`,
		},
		{
			name: `area`,
			title: `Area`,
			type: `string`,
			description: `Example: Jazz Performance.`,
		},
		{
			name: `honors`,
			title: `Honors`,
			type: `string`,
			description: `Example: Cum Laude. Maps to JSON Resume "score".`,
		},
		{
			name: `startDate`,
			title: `Start Date`,
			type: `date`,
			options: { dateFormat: `MMMM YYYY` },
		},
		{
			name: `endDate`,
			title: `End Date`,
			type: `date`,
			options: { dateFormat: `MMMM YYYY` },
			validation: (Rule) =>
				Rule.custom((endDate: string | undefined, context) => {
					const startDate = (context.document as { startDate?: string })?.startDate;
					return endDate && startDate && endDate < startDate
						? 'End date cannot be before the start date.'
						: true;
				}),
		},
	],
	preview: {
		select: {
			title: `institution`,
			studyType: `studyType`,
			area: `area`,
			startDate: `startDate`,
			endDate: `endDate`,
		},
		prepare({ title, studyType, area, startDate, endDate }) {
			const degree = [studyType, area].filter(Boolean).join(', ');
			const dates = endDate ? formatDateRange(startDate, endDate) : undefined;
			return {
				title,
				subtitle: [degree, dates].filter(Boolean).join(' · ') || undefined,
			};
		},
	},
});
