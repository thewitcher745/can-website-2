export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';


export const buildApiUrl = (path: string) => {
  return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};