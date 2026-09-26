import z from "zod";
import { imageFileSchema } from "../image.schema";
import { idSchema, nullableIdSchema } from "../primitives.schema";

export const nationalityFormSchema = z.object({
  image: imageFileSchema.nullable(),
  imageUrl: z.string().nullable(),
  name: z.string().trim().min(1).max(255),
  fifa_code: z
    .string()
    .trim()
    .regex(/^[A-Z]{3}$/, "FIFA code must be 3 uppercase letters"),
  confederation_id: idSchema,
  region_id: nullableIdSchema,
});

export type NationalityFormValues = z.infer<typeof nationalityFormSchema>;
