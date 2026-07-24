import { OrderedEntity } from "@/types/ordered-select";

export function normalizeOrderedValues<T extends OrderedEntity>(
  values: T[],
): T[] {
  return values.map((item, index) => ({
    ...item,
    display_order: index + 1,
  }));
}
