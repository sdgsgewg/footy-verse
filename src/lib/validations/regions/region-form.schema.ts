import z from "zod";
import { imageFileSchema } from "../image.schema";
import { regionTypeSchema } from "../enums.schema";
import { nullableIdSchema } from "../primitives.schema";

export const regionFormSchema = z.object({
  image: imageFileSchema.nullable(),
  imageUrl: z.string().nullable(),
  name: z.string().min(1).max(255),
  region_type: regionTypeSchema,
  parent_region_id: nullableIdSchema,
});

export type RegionFormValues = z.infer<typeof regionFormSchema>;
