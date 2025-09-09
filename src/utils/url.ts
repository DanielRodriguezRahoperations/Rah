import { SITE_URL } from "../config/site";

export function absoluteUrl(pathname: string): string {
  if (!pathname) return SITE_URL + "/";
  // Ensure single slash between origin and path
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${path}`;
}