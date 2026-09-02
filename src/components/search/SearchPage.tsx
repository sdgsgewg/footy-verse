"use client";

import { useTranslations } from "next-intl";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import { useGlobalSearch } from "@/hooks/search/useGlobalSearch";
import SearchEmpty from "./SearchEmpty";

interface Props {
  query: string;
}

export default function SearchPage({ query }: Props) {
  const t = useTranslations("public.search");

  const { data, isLoading, error } = useGlobalSearch(query);

  return (
    <main className="min-h-screen">
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("title")}
            </h1>

            <p className="mt-3 text-muted-foreground">{t("description")}</p>

            <SearchInput initialValue={query} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          {!query.trim() ? (
            <SearchEmpty />
          ) : (
            <SearchResults
              query={query}
              data={data}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>
      </section>
    </main>
  );
}
