import z from "zod";

export const nullableDate = z.preprocess(
  (value) => (value === "" ? null : value),
  z.string().nullable(),
);
