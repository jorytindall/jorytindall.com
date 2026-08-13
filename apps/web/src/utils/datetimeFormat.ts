import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import type { Event } from 'types/event';

// Default timezone for events (Pacific Time)
const DEFAULT_TIMEZONE = 'America/Los_Angeles';

/**
 * Format a date-only string into a long human-readable date.
 * Use for content types that store simple dates without timezone (talks, blog posts).
 * Example: "January 15, 2024"
 */
export const formatLongDate = (dateIso: string) => {
	return format(parseISO(dateIso), 'MMMM d, yyyy');
};

/**
 * Format a datetime string with timezone into a long date and time.
 * Use for content types that store datetime with timezone (events).
 * Example: "January 15, 2024 at 7:30 PM"
 */
export const formatEventDateTime = (dateIso: string, timezone?: string) => {
	const tz = timezone || DEFAULT_TIMEZONE;
	return formatInTimeZone(parseISO(dateIso), tz, "MMMM d, yyyy 'at' h:mm a");
};

/**
 * Format a continuous date range for multi-day events.
 * Collapses shared day/year where possible.
 * Examples:
 *   "January 15, 2024 at 7:30 PM – 11:00 PM"  (same day)
 *   "January 15 – 18, 2024"                    (same year)
 *   "December 30, 2024 – January 2, 2025"      (cross year)
 */
export const formatEventDateRange = (startIso: string, endIso?: string, timezone?: string) => {
	const tz = timezone || DEFAULT_TIMEZONE;
	if (!endIso) return formatEventDateTime(startIso, tz);

	const start = parseISO(startIso);
	const end = parseISO(endIso);

	const sameDay =
		formatInTimeZone(start, tz, 'yyyy-MM-dd') === formatInTimeZone(end, tz, 'yyyy-MM-dd');
	if (sameDay) {
		return `${formatInTimeZone(start, tz, "MMMM d, yyyy 'at' h:mm a")} – ${formatInTimeZone(end, tz, 'h:mm a')}`;
	}

	const sameMonth =
		formatInTimeZone(start, tz, 'yyyy-MM') === formatInTimeZone(end, tz, 'yyyy-MM');
	if (sameMonth) {
		return `${formatInTimeZone(start, tz, 'MMMM d')} – ${formatInTimeZone(end, tz, 'd, yyyy')}`;
	}

	const sameYear = formatInTimeZone(start, tz, 'yyyy') === formatInTimeZone(end, tz, 'yyyy');
	const startPattern = sameYear ? 'MMMM d' : 'MMMM d, yyyy';
	return `${formatInTimeZone(start, tz, startPattern)} – ${formatInTimeZone(end, tz, 'MMMM d, yyyy')}`;
};

/**
 * Produce a concise schedule label for an event based on its format.
 * - single:   "January 15, 2024 at 7:30 PM"
 * - multiDay: "January 15 – 18, 2024"
 * - series:   "January 15 – February 2, 2024 · 6 performances"
 */
export const formatEventSchedule = (
	event: Pick<Event, 'eventFormat' | 'date' | 'endDate' | 'performances'>,
	timezone?: string,
) => {
	const tz = timezone || DEFAULT_TIMEZONE;

	switch (event.eventFormat) {
		case 'multiDay':
			return formatEventDateRange(event.date, event.endDate, tz);

		case 'series': {
			const performances = event.performances ?? [];
			const count = performances.length;
			if (count === 0) return formatEventDateTime(event.date, tz);

			const sorted = [...performances].sort(
				(a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime(),
			);
			const first = sorted[0].date;
			const last = sorted[count - 1].date;
			const range =
				first === last
					? formatInTimeZone(parseISO(first), tz, 'MMMM d, yyyy')
					: formatEventDateRange(first, last, tz);

			return `${range} · ${count} performance${count === 1 ? '' : 's'}`;
		}

		default:
			return formatEventDateTime(event.date, tz);
	}
};
