/**
 * Shared date-range validation for resume entries.
 *
 * Resume dates are stored as Sanity `date` values (`YYYY-MM-DD`). The day is ignored when
 * rendered — résumés show month precision — but a full date keeps them sortable and maps
 * cleanly onto JSON Resume's ISO 8601 `startDate` / `endDate`.
 */

export type DateRangeParent = {
	startDate?: string;
	endDate?: string;
	current?: boolean;
};

/** End date is required unless the entry is marked current, and must not precede the start. */
export function validateEndDate(endDate: string | undefined, parent: DateRangeParent | undefined) {
	if (parent?.current) {
		return endDate ? 'Clear the end date, or untick "Current".' : true;
	}
	if (!endDate) {
		return 'Add an end date, or tick "Current".';
	}
	if (parent?.startDate && endDate < parent.startDate) {
		return 'End date cannot be before the start date.';
	}
	return true;
}

/** Month-and-year label for list previews, e.g. "Mar 2021 – Present". */
export function formatDateRange(startDate?: string, endDate?: string, current?: boolean) {
	const fmt = (value?: string) => {
		if (!value) return '?';
		const [year, month] = value.split('-');
		const date = new Date(Number(year), Number(month) - 1, 1);
		return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
	};
	return `${fmt(startDate)} – ${current ? 'Present' : fmt(endDate)}`;
}
