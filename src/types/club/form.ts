import { clubMutationSchema } from "@/lib/validations/clubs.schema";
import z from "zod";

export type ClubFormField = keyof z.infer<typeof clubMutationSchema>;
