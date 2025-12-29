export interface StravaTokenResponse {
	access_token: string;
	refresh_token: string;
	expires_at: number;
	expires_in: number;
	token_type: string;
}

export interface StravaActivityTotal {
	count: number;
	distance: number; // meters
	moving_time: number; // seconds
	elapsed_time: number; // seconds
	elevation_gain: number; // meters
}

export interface StravaAthleteStats {
	biggest_ride_distance: number;
	biggest_climb_elevation_gain: number;
	recent_ride_totals: StravaActivityTotal;
	recent_run_totals: StravaActivityTotal;
	recent_swim_totals: StravaActivityTotal;
	ytd_ride_totals: StravaActivityTotal;
	ytd_run_totals: StravaActivityTotal;
	ytd_swim_totals: StravaActivityTotal;
	all_ride_totals: StravaActivityTotal;
	all_run_totals: StravaActivityTotal;
	all_swim_totals: StravaActivityTotal;
}

export interface StravaDisplayStats {
	ytdMiles: number;
	ytdRuns: number;
	ytdTimeSeconds: number;
	ytdElevationFeet: number;
	allTimeMiles: number;
	allTimeRuns: number;
	error?: string;
}
