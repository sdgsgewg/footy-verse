import { z } from "zod";

export const searchSuggestionsQuerySchema = z.object({
  q: z.string().trim().min(2).max(100),
});

export type SearchSuggestionsQuery = z.infer<
  typeof searchSuggestionsQuerySchema
>;
