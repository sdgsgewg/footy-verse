import { nationalityMutationSchema } from "@/lib/validations/nationalities.schema";
import z from "zod";

export type NationalityFormField = keyof z.infer<
  typeof nationalityMutationSchema
>;
