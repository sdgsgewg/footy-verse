import z from "zod";
import { imageFileSchema } from "../image.schema";
import { idSchema } from "../primitives.schema";

export const confederationFormSchema = z.object({
  image: imageFileSchema.nullable(),
  imageUrl: z.string().nullable(),
  name: z.string().min(1).max(255),
  short_name: z.string().min(1).max(20),
  region_id: idSchema,
  founded: z.string().nullable().optional(),
  headquarters: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
});

export type ConfederationFormValues = z.infer<typeof confederationFormSchema>;
