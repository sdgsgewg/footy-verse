"use client";

import { useConfederations } from "@/hooks/dashboard/confederations";
import { NationalityFilter } from "@/types/nationality";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

interface Props {
  filters: NationalityFilter;

  updateFilter: <K extends keyof NationalityFilter>(
    key: K,
    value: NationalityFilter[K],
  ) => void;

  clearFilters: () => void;
}

export default function ActiveFiltersBar({
  filters,
  updateFilter,
  clearFilters,
}: Props) {
  const tCommonActions = useTranslations("common.actions");

  const { confederations } = useConfederations();

  const confederationMap = useMemo(() => {
    return new Map(
      confederations.map((confederation) => [
        confederation.id,
        confederation.name,
      ]),
    );
  }, [confederations]);

  const chips: {
    label: string;
    onRemove: () => void;
  }[] = [];

  // Search
  if (filters.search) {
    chips.push({
      label: `Search: ${filters.search}`,
      onRemove: () => updateFilter("search", ""),
    });
  }
  // Confederation
  if (filters.confederationId) {
    chips.push({
      label:
        confederationMap.get(filters.confederationId) ??
        filters.confederationId,
      onRemove: () => updateFilter("confederationId", undefined),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip, i) => (
        <span
          key={i}
          className="group inline-flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
          onClick={chip.onRemove}
        >
          {chip.label}
          <div className="rounded-full bg-slate-200 dark:bg-slate-700 p-0.5 group-hover:bg-slate-300 dark:group-hover:bg-slate-600 transition-colors">
            <X className="w-3 h-3 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200" />
          </div>
        </span>
      ))}

      {/* Clear all */}
      <button
        onClick={clearFilters}
        className="text-xs underline ml-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
      >
        {tCommonActions("clearAll")}
      </button>
    </div>
  );
}
