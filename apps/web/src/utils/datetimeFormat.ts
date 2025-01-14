import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { TZDate } from '@date-fns/tz';

// Helper function to convert to specified timezone
// const toSpecifiedTimezone = (date: string | Date, timeZone: string): Date => {
//   const parsedDate = typeof date === 'string' ? parseISO(date) : date;
//   return toZonedTime(parsedDate, timeZone);
// };

// Catch-all function to format the date, time, and timezone
export const formatDate = (date: string, dateFormat: string, timeZone?: string) => {
  const isoDate = parseISO(date);
  return format(new TZDate(isoDate, timeZone), dateFormat);
}
