// export function getChangedFields<
//   T extends Record<string, unknown>,
//   K extends keyof T,
// >(oldData: T, newData: T, fields: readonly K[]): string[] {
//   return fields.filter(
//     (field) => oldData[field] !== newData[field],
//   ) as string[];
// }

export function getChangedFields<T>(
  oldData: T,
  newData: T,
  fields: readonly (keyof T)[],
): string[] {
  return fields.filter(
    (field) => oldData[field] !== newData[field],
  ) as string[];
}
