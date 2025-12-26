export interface SpotifyTokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
}

export interface SpotifyImage {
	url: string;
	height: number | null;
	width: number | null;
}

export interface SpotifyArtist {
	id: string;
	name: string;
	genres: string[];
	images: SpotifyImage[];
	external_urls: {
		spotify: string;
	};
}

export interface SpotifyAlbum {
	id: string;
	name: string;
	images: SpotifyImage[];
	external_urls: {
		spotify: string;
	};
}

export interface SpotifyTrack {
	id: string;
	name: string;
	artists: Pick<SpotifyArtist, 'id' | 'name' | 'external_urls'>[];
	album: SpotifyAlbum;
	duration_ms: number;
	external_urls: {
		spotify: string;
	};
}

export interface SpotifyPlayHistoryItem {
	track: SpotifyTrack;
	played_at: string;
}

export interface SpotifyTopArtistsResponse {
	items: SpotifyArtist[];
	total: number;
	limit: number;
	offset: number;
}

export interface SpotifyRecentlyPlayedResponse {
	items: SpotifyPlayHistoryItem[];
	cursors: {
		after: string;
		before: string;
	};
	limit: number;
}

export interface SpotifyCurrentlyPlayingResponse {
	is_playing: boolean;
	item: SpotifyTrack | null;
	progress_ms: number | null;
	currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown';
}

export type TimeRange = 'short_term' | 'medium_term' | 'long_term';

export interface DisplayArtist {
	name: string;
	imageUrl: string | null;
	spotifyUrl: string;
}

export interface DisplayTrack {
	name: string;
	artistName: string;
	albumImageUrl: string | null;
	spotifyUrl: string;
	playedAt?: string;
}

export interface SpotifyDisplayStats {
	topArtists: DisplayArtist[];
	topGenres: string[];
	recentlyPlayed: DisplayTrack[];
	error?: string;
}

export interface NowPlayingData {
	isPlaying: boolean;
	trackName: string | null;
	artistName: string | null;
	albumImageUrl: string | null;
	spotifyUrl: string | null;
}
