export function parseStringField(
  formData: FormData,
  key: string,
  fallback = "",
): string {
  const raw = formData.get(key);

  return typeof raw === "string" ? raw : fallback;
}

export function parseNumberField(
  formData: FormData,
  key: string,
  fallback = 0,
): number {
  const raw = formData.get(key);

  if (typeof raw !== "string" || raw.trim() === "") {
    return fallback;
  }

  const value = Number(raw);

  return Number.isNaN(value) ? fallback : value;
}

export function parseDateField(formData: FormData, key: string): string | null {
  const raw = formData.get(key);

  if (typeof raw !== "string" || raw.trim() === "") {
    return null;
  }

  return raw;
}

export function parseBooleanField(
  formData: FormData,
  key: string,
  fallback = false,
): boolean {
  const raw = formData.get(key);

  if (typeof raw !== "string") {
    return fallback;
  }

  return raw === "true";
}

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
