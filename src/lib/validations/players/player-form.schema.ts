import { z } from "zod";

import { prefFootSchema } from "../enums.schema";
import { imageFileSchema } from "../image.schema";
import { playerPositionMutationSchema } from "../player-positions.schema";
import { playerNationalityMutationSchema } from "../player-nationalities.schema";

export const playerFormSchema = z.object({
  image: imageFileSchema.nullable(),
  imageUrl: z.string().nullable(),

  full_name: z.string().min(1).max(255),
  short_name: z.string().min(1).max(255),

  dob: z.string().min(1),
  pob: z.string().min(1).max(255),

  preferred_foot: z.union([prefFootSchema, z.literal("")]),

  height: z.number().positive().min(100).max(250).nullable(),

  weight: z.number().positive().nullable(),

  market_value: z.number().nonnegative().nullable(),

  positions: playerPositionMutationSchema.array(),

  nationalities: playerNationalityMutationSchema.array(),
});

export type PlayerFormValues = z.infer<typeof playerFormSchema>;
