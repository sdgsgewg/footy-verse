import { OrderedEntity } from "@/types/ordered";

export function normalizeOrderedValues<T extends OrderedEntity>(
  values: T[],
): T[] {
  return values.map((item, index) => ({
    ...item,
    display_order: index + 1,
  }));
}
