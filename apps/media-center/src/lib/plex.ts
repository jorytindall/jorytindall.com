const PLEX_API = 'https://plex.tv';

function getClientId(): string {
	const id = import.meta.env.PLEX_CLIENT_ID;
	if (!id) throw new Error('PLEX_CLIENT_ID is not set');
	return id;
}

function getServerMachineId(): string {
	const id = import.meta.env.PLEX_SERVER_MACHINE_ID;
	if (!id) throw new Error('PLEX_SERVER_MACHINE_ID is not set');
	return id;
}

function headers(token?: string): Record<string, string> {
	const h: Record<string, string> = {
		Accept: 'application/json',
		'X-Plex-Client-Identifier': getClientId(),
		'X-Plex-Product': 'Media Center',
	};
	if (token) h['X-Plex-Token'] = token;
	return h;
}

export interface PlexPin {
	id: number;
	code: string;
}

export async function createPin(): Promise<PlexPin> {
	const res = await fetch(`${PLEX_API}/api/v2/pins`, {
		method: 'POST',
		headers: {
			...headers(),
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: 'strong=true',
	});

	if (!res.ok) throw new Error(`Failed to create PIN: ${res.status}`);
	const data = await res.json();
	return { id: data.id, code: data.code };
}

export function getAuthUrl(code: string, forwardUrl: string): string {
	const params = new URLSearchParams({
		clientID: getClientId(),
		code,
		'context[device][product]': 'Media Center',
		forwardUrl,
	});
	return `https://app.plex.tv/auth#?${params.toString()}`;
}

export async function checkPin(pinId: number): Promise<{ authToken: string } | null> {
	const res = await fetch(`${PLEX_API}/api/v2/pins/${pinId}`, {
		headers: headers(),
	});

	if (!res.ok) return null;
	const data = await res.json();
	if (!data.authToken) return null;
	return { authToken: data.authToken };
}

export interface PlexUser {
	username: string;
	email: string;
	thumb: string;
}

export async function getUser(token: string): Promise<PlexUser> {
	const res = await fetch(`${PLEX_API}/api/v2/user`, {
		headers: headers(token),
	});

	if (!res.ok) throw new Error(`Failed to get user: ${res.status}`);
	const data = await res.json();
	return {
		username: data.username,
		email: data.email,
		thumb: data.thumb,
	};
}

export async function hasServerAccess(token: string): Promise<boolean> {
	const res = await fetch(`${PLEX_API}/api/v2/resources`, {
		headers: headers(token),
	});

	if (!res.ok) return false;
	const resources: Array<{ clientIdentifier: string }> = await res.json();
	return resources.some((r) => r.clientIdentifier === getServerMachineId());
}
