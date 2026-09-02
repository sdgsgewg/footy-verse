import { X } from "lucide-react";
import { useTranslations } from "next-intl";

export interface ActiveFilterChip {
  key: string;
  label: string;
  onRemove: () => void;
}

interface ActiveFiltersBarProps {
  chips: ActiveFilterChip[];
  clearFilters: () => void;
}

export default function ActiveFiltersBar({
  chips,
  clearFilters,
}: ActiveFiltersBarProps) {
  const tCommonActions = useTranslations("common.actions");

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="group inline-flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
        >
          {chip.label}

          <span className="rounded-full bg-slate-200 dark:bg-slate-700 p-0.5 group-hover:bg-slate-300 dark:group-hover:bg-slate-600 transition-colors">
            <X className="w-3 h-3 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200" />
          </span>
        </button>
      ))}

      <button
        type="button"
        onClick={clearFilters}
        className="text-xs underline ml-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
      >
        {tCommonActions("clearAll")}
      </button>
    </div>
  );
}
