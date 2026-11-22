// Public (no-auth) fetch for server components. Never throws: the page renders an empty state if the API is down.
const API =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000';

export async function getJson<T>(
  path: string,
  revalidate = 0,
): Promise<T | null> {
  try {
    const r = await fetch(
      API + path,
      revalidate ? { next: { revalidate } } : { cache: 'no-store' },
    );
    return r.ok ? ((await r.json()) as T) : null;
  } catch {
    return null;
  }
}
