"use client";

import { SEARCH_ENTITY_CONFIG } from "@/constants/search";
import { SearchEntityType, SearchResult } from "@/types/search";
import SearchResultItem from "./SearchResultItem";

interface Props {
  type: SearchEntityType;
  results: SearchResult[];
}

export default function SearchResultGroup({ type, results }: Props) {
  const config = SEARCH_ENTITY_CONFIG[type];

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{config.label}</h2>

        <span className="text-sm text-muted-foreground">{results.length}</span>
      </div>

      <div className="divide-y rounded-xl border bg-card">
        {results.map((result) => (
          <SearchResultItem key={result.id} result={result} />
        ))}
      </div>
    </section>
  );
}
