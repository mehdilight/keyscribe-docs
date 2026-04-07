const base = import.meta.env.BASE_URL;

export function url(path: string): string {
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
}
