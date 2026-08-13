export type EventFormat = 'single' | 'multiDay' | 'series';

export interface EventImage {
	src?: string;
	alt?: string;
}

export interface EventPerformance {
	_key: string;
	date: string;
	note?: string;
}

export interface Event {
	_id: string;
	title: string;
	slug: string;
	eventFormat?: EventFormat;
	/** Start date/time (ISO). Also the first performance for a series. */
	date: string;
	/** End date/time (ISO) for multi-day events. */
	endDate?: string;
	/** Discrete performances for a series/production. */
	performances?: EventPerformance[];
	location?: string;
	url?: string;
	project?: string;
	image?: EventImage;
	description?: {
		content?: React.ReactElement;
	};
}
