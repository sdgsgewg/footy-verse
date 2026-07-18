"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { ClubFilter } from "@/hooks/clubs/useClubFilter";
import { getClubTypeLabel } from "@/lib/clubs/labels";
import { ClubType } from "@/enums/ClubType";
import { useNationalities } from "@/hooks/dashboard/nationalities";
import { useMemo } from "react";

interface Props {
  filters: ClubFilter;
  setFilters: React.Dispatch<React.SetStateAction<ClubFilter>>;
  onClearAll: () => void;
}

export default function ActiveFiltersBar({
  filters,
  setFilters,
  onClearAll,
}: Props) {
  const tCommon = useTranslations("common");
  const tCommonActions = useTranslations("common.actions");

  const { nationalities } = useNationalities();

  const nationMap = useMemo(() => {
    return new Map(nationalities.map((nation) => [nation.id, nation.name]));
  }, [nationalities]);

  const tClubType = useTranslations("dashboard.clubs.form.options.clubType");

  const chips: {
    label: string;
    onRemove: () => void;
  }[] = [];

  // 🔍 Search
  if (filters.name) {
    chips.push({
      label: `Search: ${filters.name}`,
      onRemove: () => setFilters((prev) => ({ ...prev, name: "" })),
    });
  }

  // Nation
  if (filters.nationId) {
    chips.push({
      label: nationMap.get(filters.nationId) ?? filters.nationId,
      onRemove: () => setFilters((prev) => ({ ...prev, nationId: undefined })),
    });
  }

  // Club Type
  if (filters.clubType) {
    chips.push({
      label: `${getClubTypeLabel(filters.clubType as ClubType, tClubType)}`,
      onRemove: () => setFilters((prev) => ({ ...prev, clubType: undefined })),
    });
  }

  // 🔽 Sort (optional)
  if (filters.sort !== "newest") {
    chips.push({
      label: `${tCommon("sort.title")}: ${tCommon(`sort.${filters.sort}`)}`,
      onRemove: () => setFilters((prev) => ({ ...prev, sort: "newest" })),
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
        onClick={onClearAll}
        className="text-xs underline ml-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
      >
        {tCommonActions("clearAll")}
      </button>
    </div>
  );
}
