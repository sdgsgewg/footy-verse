import { z } from "zod";

export const globalSearchQuerySchema = z.object({
  q: z.string().trim().min(1).max(100),
});

export type GlobalSearchQuery = z.infer<typeof globalSearchQuerySchema>;

export function getSearchQuery(request: Request) {
  const url = new URL(request.url);

  return globalSearchQuerySchema.parse({
    q: url.searchParams.get("q") ?? "",
  });
}
