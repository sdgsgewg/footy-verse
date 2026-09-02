"use client";

import { useTranslations } from "next-intl";
import { GlobalSearchResponse } from "@/types/search";
import SearchResultGroup from "./SearchResultGroup";
import SearchNoResults from "./SearchNoResults";

interface Props {
  query: string;
  data?: GlobalSearchResponse | null;
  isLoading: boolean;
  error: Error | null;
}

export default function SearchResults({
  query,
  data,
  isLoading,
  error,
}: Props) {
  const t = useTranslations("public.search");

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2].map((item) => (
          <div key={item} className="space-y-4">
            <div className="h-6 w-32 animate-pulse rounded bg-muted" />

            <div className="h-20 animate-pulse rounded-xl bg-muted" />
            <div className="h-20 animate-pulse rounded-xl bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="font-medium">{t("error.title")}</p>

        <p className="mt-2 text-sm text-muted-foreground">
          {t("error.description")}
        </p>
      </div>
    );
  }

  if (!data || data.total === 0) {
    return <SearchNoResults query={query} />;
  }

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm text-muted-foreground">
          {t("resultsCount", { count: data.total })}
        </p>
      </div>

      {data.groups.map((group) => (
        <SearchResultGroup
          key={group.type}
          type={group.type}
          results={group.results}
        />
      ))}
    </div>
  );
}
