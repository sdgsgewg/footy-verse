import { Tables } from "@/lib/database.types";

export type NationalitySummary = Pick<
  Tables<"nationalities">,
  "id" | "name" | "image"
>;
