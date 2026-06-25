/* Utility: conditional className join (drop-in for clsx in a real repo). */
export type ClassValue = string | false | null | undefined;

export const cn = (...classes: ClassValue[]): string =>
  classes.filter(Boolean).join(' ');
