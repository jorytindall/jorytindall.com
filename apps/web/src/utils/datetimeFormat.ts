import { format, parseISO } from 'date-fns';

export const formatIso = (date: string) => parseISO(date);

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
