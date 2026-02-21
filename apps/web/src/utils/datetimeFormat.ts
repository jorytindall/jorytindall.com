import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

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
  return formatInTimeZone(parseISO(dateIso), tz, 'MMMM d, yyyy \'at\' h:mm a');
};
