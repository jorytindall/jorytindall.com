import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { TZDate } from '@date-fns/tz';

// Helper function to convert to specified timezone
const toSpecifiedTimezone = (date: string | Date, timeZone: string): Date => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return toZonedTime(parsedDate, timeZone);
};

// Catch-all function to format the date, time, and timezone
export const formatDate = (dateIso: string, dateFormat: string, timeZone: string) => {
  // const zonedDate = toSpecifiedTimezone(dateIso, );
  // console.log(format(dateIso, dateFormat, { in: tz(timeZone)}));
  return format(new TZDate(dateIso, timeZone), dateFormat);
}
