const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

let cache: { token: string; exp: number } | null = null;
export const clearToken = () => {
  cache = null;
};

// JWT for the Express API: issued from the BetterAuth session, cached until ~1 minute before it expires
async function getToken(force = false) {
  if (!force && cache && cache.exp - Date.now() > 60_000) return cache.token;
  const r = await fetch('/api/auth/get-jwt', { credentials: 'include' });
  if (!r.ok) throw new Error('Please sign in again');
  const { token } = await r.json();
  cache = { token, exp: JSON.parse(atob(token.split('.')[1])).exp * 1000 };
  return token as string;
}

type Init = Omit<RequestInit, 'body'> & {
  json?: unknown;
  body?: BodyInit | null;
};

export async function api<T = any>(path: string, init: Init = {}): Promise<T> {
  const call = async (force: boolean) =>
    fetch(API + path, {
      ...init,
      headers: {
        ...(init.json !== undefined
          ? { 'Content-Type': 'application/json' }
          : {}),
        ...(init.headers || {}),
        Authorization: `Bearer ${await getToken(force)}`,
      },
      body: init.json !== undefined ? JSON.stringify(init.json) : init.body,
    });
  let res = await call(false);
  if (res.status === 401) res = await call(true);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data as T;
}
