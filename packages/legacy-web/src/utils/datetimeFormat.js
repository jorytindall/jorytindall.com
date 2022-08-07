import { format, parseISO } from 'date-fns';

export const formatIso = (date) => parseISO(date);

export const formatDateTime = (dateIso) => {
	const formatted = format(formatIso(dateIso), 'PPPp');
	return formatted;
};

export const formatDateString = (dateIso) => {
	const formatted = format(formatIso(dateIso), 'ddMMYYYY');
	return formatted;
};
