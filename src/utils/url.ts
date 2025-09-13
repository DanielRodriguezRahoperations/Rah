export const absoluteUrl = (path: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.rahoperations.com';
  return `${baseUrl}${path}`;
};

export const getCanonicalUrl = (path: string): string => {
  return absoluteUrl(path);
};
