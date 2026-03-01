const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api/v1';

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json() as Promise<T>;
}
