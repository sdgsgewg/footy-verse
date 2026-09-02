import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEARCH_ENTITY_CONFIG } from "@/constants/search";
import { useSearchSuggestions } from "@/hooks/search";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "@/navigation";
import { SearchResult } from "@/types/search";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import SearchSuggestions from "./SearchSuggestions";

const HeroSearch = () => {
  const t = useTranslations("public.home.hero.search");
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const { groups, loading } = useSearchSuggestions(debouncedSearch);

  const handleSearch = () => {
    const query = search.trim();

    if (!query) return;

    const params = new URLSearchParams({
      q: query,
    });

    router.push(`/search?${params.toString()}`);
  };

  const handleSelect = (result: SearchResult) => {
    const config = SEARCH_ENTITY_CONFIG[result.type];

    router.push(config.route(result));
  };

  return (
    <div className="relative mt-10 w-full max-w-2xl">
      {/* Search Input */}
      <div className="flex flex-col gap-3 rounded-xl border bg-background/80 p-2 shadow-lg backdrop-blur sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }

              if (event.key === "Escape") {
                setIsFocused(false);
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={t("placeholder")}
            className="h-12 border-0 bg-transparent pl-10 text-base shadow-none focus-visible:ring-0"
          />
        </div>

        <Button
          size="lg"
          className="h-12 px-7"
          onClick={handleSearch}
          disabled={!search.trim()}
        >
          {t("button")}
        </Button>
      </div>

      {isFocused && search.trim().length >= 2 && (
        <SearchSuggestions
          groups={groups}
          loading={loading}
          query={search}
          onSelect={handleSelect}
          onViewAll={handleSearch}
        />
      )}

      {/* Hint */}
      <p className="mt-3 text-xs text-muted-foreground">{t("hint")}</p>
    </div>
  );
};

export default HeroSearch;
