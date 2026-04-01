export const absoluteUrl = (path: string): string => {
  const baseUrl = import.meta.env.VITE_APP_URL || 'https://www.rahoperations.com';
  return `${baseUrl}${path}`;
};

export const getCanonicalUrl = (path: string): string => {
  return absoluteUrl(path);
};
