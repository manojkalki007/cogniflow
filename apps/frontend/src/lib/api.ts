const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api/v1';

async function safeJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) return {} as T;
  return JSON.parse(text) as T;
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return safeJson<T>(response);
}

export async function apiPost<T>(path: string, body?: Record<string, unknown>): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body ?? {}),
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return safeJson<T>(response);
}

export async function apiPatch<T>(path: string, body?: Record<string, unknown>): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body ?? {}),
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return safeJson<T>(response);
}
