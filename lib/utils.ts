import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Tailwind-aware class merge so overrides don't pile up specificity debt. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Budgeted number formatting used by the achievement + project counters. */
export function formatNumber(value: number, locale = 'en-US') {
  return new Intl.NumberFormat(locale).format(value);
}
