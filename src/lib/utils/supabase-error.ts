interface PostgresError {
  code?: string;
  constraint?: string;
}

export function isUniqueViolation(
  error: unknown,
  constraint?: string,
): boolean {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const postgresError = error as PostgresError;

  if (postgresError.code !== "23505") {
    return false;
  }

  if (constraint) {
    return postgresError.constraint === constraint;
  }

  return true;
}
