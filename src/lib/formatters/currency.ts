/**
 *
 * @param value
 * @param options
 * @returns string
 */
export function formatEuroValue(
  value: number,
  options?: {
    decimals?: number;
  },
): string {
  const decimals = options?.decimals ?? 2;

  if (value == 0) return `€${value}`;

  if (value >= 1_000_000) {
    return `€${(value / 1_000_000).toFixed(decimals)}m`;
  }

  return `€${(value / 1000).toFixed(0)}k`;
}
