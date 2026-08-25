import { regionMutationSchema } from "@/lib/validations/regions.schema";
import z from "zod";

export type RegionFormField = keyof z.infer<typeof regionMutationSchema>;
