const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** JSON Resume date (`YYYY`, `YYYY-MM` or `YYYY-MM-DD`) → `Jun 2025` / `2012`. */
export function formatMonth(date?: string): string | undefined {
	if (!date) return undefined;
	const [year, month] = date.split('-');
	return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

/** `Jun 2025 – Present`, `Jun 2022 – Jun 2025`, or a single date when there is no start. */
export function formatRange(startDate?: string, endDate?: string): string {
	const start = formatMonth(startDate);
	const end = endDate ? formatMonth(endDate) : 'Present';
	if (!start) return endDate ? (formatMonth(endDate) ?? '') : '';
	return `${start} – ${end}`;
}

/** `https://www.linkedin.com/in/x/` → `linkedin.com/in/x`, for display. */
export function displayUrl(url: string): string {
	return url
		.replace(/^https?:\/\//, '')
		.replace(/^www\./, '')
		.replace(/\/$/, '');
}
