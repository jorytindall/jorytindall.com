import { BiBriefcase } from 'react-icons/bi';
import { defineType } from 'sanity';
import { type DateRangeParent, formatDateRange, validateEndDate } from '../../../utils/resumeDates';

/** A single role. Shared by every résumé variant; maps to a JSON Resume `work[]` entry. */
export default defineType({
	name: `experience`,
	title: `Experience`,
	type: `document`,
	icon: BiBriefcase,
	fields: [
		{
			name: `employer`,
			title: `Employer`,
			type: `string`,
			validation: (Rule) => Rule.required().error(`Add the employer.`),
		},
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Use the official title as it appeared at the company.`,
			validation: (Rule) => Rule.required().error(`Add the job title.`),
		},
		{
			name: `url`,
			title: `Employer URL`,
			type: `url`,
		},
		{
			name: `location`,
			title: `Location`,
			type: `string`,
			description: `Example: Remote, or Portland, OR.`,
		},
		{
			name: `startDate`,
			title: `Start Date`,
			type: `date`,
			options: { dateFormat: `MMMM YYYY` },
			validation: (Rule) => Rule.required().error(`Add a start date.`),
		},
		{
			name: `current`,
			title: `Current`,
			type: `boolean`,
			description: `Tick for a role you still hold. It renders as "Present".`,
			initialValue: false,
		},
		{
			name: `endDate`,
			title: `End Date`,
			type: `date`,
			options: { dateFormat: `MMMM YYYY` },
			validation: (Rule) =>
				Rule.custom((endDate: string | undefined, context) =>
					validateEndDate(endDate, context.document as DateRangeParent),
				),
		},
		{
			name: `summary`,
			title: `Summary`,
			type: `text`,
			rows: 3,
			description: `Optional one-line description of the role or company.`,
		},
		{
			name: `highlights`,
			title: `Highlights`,
			type: `array`,
			of: [{ type: `resumeHighlight` }],
			validation: (Rule) =>
				Rule.max(6).warning(`More than six highlights will not fit on one page.`),
		},
	],
	orderings: [
		{
			title: `Start date, newest first`,
			name: `startDateDesc`,
			by: [{ field: `startDate`, direction: `desc` }],
		},
	],
	preview: {
		select: {
			title: `title`,
			employer: `employer`,
			startDate: `startDate`,
			endDate: `endDate`,
			current: `current`,
		},
		prepare({ title, employer, startDate, endDate, current }) {
			return {
				title: [title, employer].filter(Boolean).join(' · '),
				subtitle: formatDateRange(startDate, endDate, current),
			};
		},
	},
});
