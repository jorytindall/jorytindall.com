import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

// Default timezone for events (Pacific Time)
const DEFAULT_TIMEZONE = 'America/Los_Angeles';

export const formatIso = (date: string) => {
  // If the date string doesn't include a timezone, append the time portion
  // This ensures the date is parsed as the start of day in the local timezone
  if (!date.includes('T')) {
    return parseISO(`${date}T00:00:00`);
  }
  return parseISO(date);
};

export const formatDateTime = (dateIso: string, timezone?: string) => {
  const tz = timezone || DEFAULT_TIMEZONE;
  const formatted = formatInTimeZone(parseISO(dateIso), tz, 'PPPp');
  return formatted;
};

export const formatDate = (dateIso: string, timezone?: string) => {
  const tz = timezone || DEFAULT_TIMEZONE;
  const formatted = formatInTimeZone(parseISO(dateIso), tz, 'PP');
  return formatted;
};

export const formatDateString = (dateIso: string, timezone?: string) => {
  const tz = timezone || DEFAULT_TIMEZONE;
  const formatted = formatInTimeZone(parseISO(dateIso), tz, 'ddMMyyyy');
  return formatted;
};

// New function specifically for event dates that ensures Pacific Time
export const formatEventDate = (dateIso: string, timezone?: string) => {
  const tz = timezone || DEFAULT_TIMEZONE;
  return formatInTimeZone(parseISO(dateIso), tz, 'MMMM d, yyyy');
};

// New function for event date and time
export const formatEventDateTime = (dateIso: string, timezone?: string) => {
  const tz = timezone || DEFAULT_TIMEZONE;
  return formatInTimeZone(parseISO(dateIso), tz, 'MMMM d, yyyy \'at\' h:mm a');
};