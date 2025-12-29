import type {
	StravaTokenResponse,
	StravaAthleteStats,
	StravaDisplayStats,
} from './types';

const STRAVA_API_BASE = 'https://www.strava.com/api/v3';
const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token';

const METERS_TO_MILES = 0.000621371;
const METERS_TO_FEET = 3.28084;

let cachedAccessToken: string | null = null;
let tokenExpiresAt: number = 0;

async function refreshAccessToken(): Promise<string> {
	const clientId = process.env.STRAVA_CLIENT_ID;
	const clientSecret = process.env.STRAVA_CLIENT_SECRET;
	const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

	if (!clientId || !clientSecret || !refreshToken) {
		throw new Error('Missing Strava environment variables');
	}

	const response = await fetch(STRAVA_TOKEN_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			client_id: clientId,
			client_secret: clientSecret,
			refresh_token: refreshToken,
			grant_type: 'refresh_token',
		}),
	});

	if (!response.ok) {
		throw new Error(`Failed to refresh Strava token: ${response.status}`);
	}

	const data: StravaTokenResponse = await response.json();

	cachedAccessToken = data.access_token;
	tokenExpiresAt = data.expires_at;

	return data.access_token;
}

async function getAccessToken(): Promise<string> {
	const now = Math.floor(Date.now() / 1000);

	if (cachedAccessToken && tokenExpiresAt > now + 60) {
		return cachedAccessToken;
	}

	return refreshAccessToken();
}

export async function getAthleteStats(): Promise<StravaAthleteStats> {
	const athleteId = process.env.STRAVA_ATHLETE_ID;

	if (!athleteId) {
		throw new Error('Missing STRAVA_ATHLETE_ID environment variable');
	}

	const accessToken = await getAccessToken();

	const response = await fetch(
		`${STRAVA_API_BASE}/athletes/${athleteId}/stats`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch Strava stats: ${response.status}`);
	}

	return response.json();
}

export function formatStats(stats: StravaAthleteStats): StravaDisplayStats {
	const ytdRun = stats.ytd_run_totals;
	const allRun = stats.all_run_totals;

	return {
		ytdMiles: Math.round(ytdRun.distance * METERS_TO_MILES),
		ytdRuns: ytdRun.count,
		ytdTimeSeconds: ytdRun.moving_time,
		ytdElevationFeet: Math.round(ytdRun.elevation_gain * METERS_TO_FEET),
		allTimeMiles: Math.round(allRun.distance * METERS_TO_MILES),
		allTimeRuns: allRun.count,
	};
}
