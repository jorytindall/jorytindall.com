import { format, parseISO } from 'date-fns';

export const formatIso = (date: string) => {
  // If the date string doesn't include a timezone, append the time portion
  // This ensures the date is parsed as the start of day in the local timezone
  if (!date.includes('T')) {
    return parseISO(`${date}T00:00:00`);
  }
  return parseISO(date);
};

export const formatDateTime = (dateIso: string) => {
  const formatted = format(formatIso(dateIso), 'PPPp');
  return formatted;
};

export const formatDate = (dateIso: string) => {
  const formatted = format(formatIso(dateIso), 'PP');
  return formatted;
};

export const formatDateString = (dateIso: string) => {
  const formatted = format(formatIso(dateIso), 'ddMMyyyy');
  return formatted;
};