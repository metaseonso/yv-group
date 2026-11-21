import { en } from './en';
import { pt } from './pt';
import { uk } from './uk';
import { ru } from './ru';
import type { Copy, Lang } from './types';

export const COPY: Record<Lang, Copy> = { en, pt, uk, ru };
export const LANGS: Lang[] = ['en', 'pt', 'uk', 'ru'];
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const pathFor = (lang: Lang) => (lang === 'en' ? `${base}/` : `${base}/${lang}/`);
