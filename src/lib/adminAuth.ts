const KEY = 'rah_admin_token';

export function getAdminToken(): string | null {
  return localStorage.getItem(KEY);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(KEY, token);
}

export function clearAdminToken(): void {
  localStorage.removeItem(KEY);
}

export function isAdminAuthenticated(): boolean {
  return !!localStorage.getItem(KEY);
}

export function adminHeaders(): Record<string, string> {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
