import { z } from "zod";

import { idSchema } from "../primitives.schema";
import { imageFileSchema } from "../image.schema";

export const clubFormSchema = z.object({
  image: imageFileSchema.nullable(),
  imageUrl: z.string().nullable(),
  full_name: z.string().min(1).max(255),
  short_name: z.string().min(1).max(255),
  nation_id: idSchema,
});

export type ClubFormValues = z.infer<typeof clubFormSchema>;
