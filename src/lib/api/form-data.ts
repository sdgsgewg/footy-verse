export function parseJsonField<T>(
  formData: FormData,
  key: string,
  fallback: T,
): T {
  const raw = formData.get(key);

  if (typeof raw !== "string" || raw.trim() === "") {
    return fallback;
  }

  return JSON.parse(raw) as T;
}
