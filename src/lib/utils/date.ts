export function formatDate(
  date: string | null | undefined,
  locale: string = "en-GB",
): string {
  if (!date) return "-";

  return new Date(date).toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatLocaleDate(date: string | Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
