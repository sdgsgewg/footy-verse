import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/navigation";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const HeroSearch = () => {
  const t = useTranslations("public.home.hero.search");
  const router = useRouter();

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const query = search.trim();

    if (!query) return;

    const params = new URLSearchParams({
      q: query,
    });

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="mt-10 w-full max-w-2xl">
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
            }}
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

      <p className="mt-3 text-xs text-muted-foreground">{t("hint")}</p>
    </div>
  );
};

export default HeroSearch;
