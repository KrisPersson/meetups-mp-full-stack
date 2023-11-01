export function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + '...' : str;
}

export const APP_URL = (import.meta.env.VITE_APP_URL as string) || '/';
export const APP_API_URL =
  (import.meta.env.VITE_APP_API_URL as string) ||
  'https://auxgcm6h3g.execute-api.eu-north-1.amazonaws.com/api';
