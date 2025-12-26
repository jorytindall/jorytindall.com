import type {
	SpotifyTokenResponse,
	SpotifyTopArtistsResponse,
	SpotifyRecentlyPlayedResponse,
	SpotifyCurrentlyPlayingResponse,
	SpotifyArtist,
	SpotifyDisplayStats,
	NowPlayingData,
	DisplayArtist,
	DisplayTrack,
	TimeRange,
} from './types';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

let cachedAccessToken: string | null = null;
let tokenExpiresAt: number = 0;

async function refreshAccessToken(): Promise<string> {
	const clientId = process.env.SPOTIFY_CLIENT_ID;
	const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
	const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

	if (!clientId || !clientSecret || !refreshToken) {
		throw new Error('Missing Spotify environment variables');
	}

	const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
		'base64'
	);

	const response = await fetch(SPOTIFY_TOKEN_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${basicAuth}`,
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
		}),
	});

	if (!response.ok) {
		throw new Error(`Failed to refresh Spotify token: ${response.status}`);
	}

	const data: SpotifyTokenResponse = await response.json();

	cachedAccessToken = data.access_token;
	// expires_in is in seconds, convert to timestamp with 60-second buffer
	tokenExpiresAt = Math.floor(Date.now() / 1000) + data.expires_in - 60;

	return data.access_token;
}

async function getAccessToken(): Promise<string> {
	const now = Math.floor(Date.now() / 1000);

	if (cachedAccessToken && tokenExpiresAt > now) {
		return cachedAccessToken;
	}

	return refreshAccessToken();
}

export async function getTopArtists(
	timeRange: TimeRange = 'medium_term',
	limit: number = 10
): Promise<SpotifyArtist[]> {
	const accessToken = await getAccessToken();

	const response = await fetch(
		`${SPOTIFY_API_BASE}/me/top/artists?time_range=${timeRange}&limit=${limit}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch top artists: ${response.status}`);
	}

	const data: SpotifyTopArtistsResponse = await response.json();
	return data.items;
}

export async function getRecentlyPlayed(
	limit: number = 10
): Promise<SpotifyRecentlyPlayedResponse> {
	const accessToken = await getAccessToken();

	const response = await fetch(
		`${SPOTIFY_API_BASE}/me/player/recently-played?limit=${limit}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch recently played: ${response.status}`);
	}

	return response.json();
}

export async function getCurrentlyPlaying(): Promise<SpotifyCurrentlyPlayingResponse | null> {
	const accessToken = await getAccessToken();

	const response = await fetch(`${SPOTIFY_API_BASE}/me/player/currently-playing`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	// 204 means no content (nothing playing)
	if (response.status === 204) {
		return null;
	}

	if (!response.ok) {
		throw new Error(`Failed to fetch currently playing: ${response.status}`);
	}

	return response.json();
}

export function extractGenresFromArtists(
	artists: SpotifyArtist[],
	limit: number = 10
): string[] {
	const genreCount = new Map<string, number>();

	for (const artist of artists) {
		for (const genre of artist.genres) {
			genreCount.set(genre, (genreCount.get(genre) || 0) + 1);
		}
	}

	return Array.from(genreCount.entries())
		.sort((a, b) => b[1] - a[1])
		.slice(0, limit)
		.map(([genre]) => genre);
}

export function formatArtistForDisplay(artist: SpotifyArtist): DisplayArtist {
	return {
		name: artist.name,
		imageUrl: artist.images[0]?.url || null,
		spotifyUrl: artist.external_urls.spotify,
	};
}

export function formatTrackForDisplay(
	track: SpotifyRecentlyPlayedResponse['items'][0]
): DisplayTrack {
	return {
		name: track.track.name,
		artistName: track.track.artists.map((a) => a.name).join(', '),
		albumImageUrl: track.track.album.images[0]?.url || null,
		spotifyUrl: track.track.external_urls.spotify,
		playedAt: track.played_at,
	};
}

export async function getSpotifyDisplayStats(
	timeRange: TimeRange = 'medium_term',
	artistLimit: number = 5,
	genreLimit: number = 5,
	recentLimit: number = 5
): Promise<SpotifyDisplayStats> {
	const [artists, recentlyPlayedResponse] = await Promise.all([
		getTopArtists(timeRange, artistLimit),
		getRecentlyPlayed(recentLimit),
	]);

	return {
		topArtists: artists.map(formatArtistForDisplay),
		topGenres: extractGenresFromArtists(artists, genreLimit),
		recentlyPlayed: recentlyPlayedResponse.items.map(formatTrackForDisplay),
	};
}

export function formatNowPlaying(
	data: SpotifyCurrentlyPlayingResponse | null
): NowPlayingData {
	if (!data || !data.is_playing || data.currently_playing_type !== 'track' || !data.item) {
		return {
			isPlaying: false,
			trackName: null,
			artistName: null,
			albumImageUrl: null,
			spotifyUrl: null,
		};
	}

	return {
		isPlaying: true,
		trackName: data.item.name,
		artistName: data.item.artists.map((a) => a.name).join(', '),
		albumImageUrl: data.item.album.images[0]?.url || null,
		spotifyUrl: data.item.external_urls.spotify,
	};
}
