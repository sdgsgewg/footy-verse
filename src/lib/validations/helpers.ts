import { z } from "zod";

export const nullableDate = z
  .string()
  .transform((value) => (value === "" ? null : value))
  .nullable();
