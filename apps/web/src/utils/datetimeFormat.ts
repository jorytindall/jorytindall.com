import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

// Helper function to convert to specified timezone
const toSpecifiedTimezone = (date: string | Date, timeZone: string): Date => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return toZonedTime(parsedDate, timeZone);
};

export const formatIso = (date: string, timeZone: string): Date => 
  toSpecifiedTimezone(date, timeZone);

export const formatDateTime = (dateIso: string, timeZone: string): string => {
  const zonedDate = toSpecifiedTimezone(dateIso, timeZone);
  return format(zonedDate, 'PPPp');
};

export const formatDate = (dateIso: string, timeZone: string): string => {
  const zonedDate = toSpecifiedTimezone(dateIso, timeZone);
  return format(zonedDate, 'PP');
};

export const formatDateString = (dateIso: string, timeZone: string): string => {
  const zonedDate = toSpecifiedTimezone(dateIso, timeZone);
  return format(zonedDate, 'ddMMyyyy');
};