import { SearchResult, SearchSuggestionGroup } from "@/types/search";
import SearchSuggestionItem from "./SearchSuggestionItem";
import React from "react";

interface Props {
  groups: SearchSuggestionGroup[];
  loading: boolean;
  query: string;
  onSelect: (result: SearchResult) => void;
  onViewAll: () => void;
}

function SearchSuggestionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-0 right-0 z-50 mt-2 rounded-xl border bg-popover shadow-xl">
      {children}
    </div>
  );
}

export default function SearchSuggestions({
  groups,
  loading,
  query,
  onSelect,
  onViewAll,
}: Props) {
  if (loading) {
    return (
      <SearchSuggestionWrapper>
        <div className="p-4">
          <div className="h-5 w-32 animate-pulse rounded bg-muted" />
          <div className="mt-3 h-12 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-12 animate-pulse rounded bg-muted" />
        </div>
      </SearchSuggestionWrapper>
    );
  }

  if (!groups.length) {
    return null;
  }

  return (
    <SearchSuggestionWrapper>
      {/* Results */}
      <div className="max-h-40 overflow-y-auto p-2">
        {groups
          .filter((group) => group.results.length > 0)
          .map((group) => (
            <div key={group.type}>
              <p className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">
                {group.type}
              </p>

              {group.results.map((result) => (
                <SearchSuggestionItem
                  key={`${result.type}-${result.id}`}
                  result={result}
                  onSelect={onSelect}
                />
              ))}
            </div>
          ))}
      </div>

      {/* Footer */}
      <button
        type="button"
        onMouseDown={(event) => {
          event.preventDefault();
          onViewAll();
        }}
        className="w-full border-t px-4 py-3 text-sm font-medium text-primary hover:bg-muted cursor-pointer"
      >
        {`View all results for "${query}"`}
      </button>
    </SearchSuggestionWrapper>
  );
}
