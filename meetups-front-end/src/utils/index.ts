export function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + '...' : str;
}

export const APP_URL = import.meta.env.VITE_APP_URL as string;
