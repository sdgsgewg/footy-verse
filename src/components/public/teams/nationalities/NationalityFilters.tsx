import { Loader2, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { NationalityFilter } from "@/types/nationality";
import { ComboboxField } from "@/components/forms/fields";
import { useConfederationOptions } from "@/hooks/confederations/useConfederationOptions";

interface NationalityFiltersProps {
  filters: NationalityFilter;
  setFilter: <K extends keyof NationalityFilter>(
    key: K,
    value: NationalityFilter[K],
  ) => void;
  isSearching: boolean;
}

const NationalityFilters = ({
  filters,
  setFilter,
  isSearching,
}: NationalityFiltersProps) => {
  const tNation = useTranslations("dashboard.nationalities");
  const tCommon = useTranslations("common");
  const tEntities = useTranslations("entities");

  const { confederationOptions } = useConfederationOptions();

  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* Search */}
      <div className="w-full relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={tCommon("search.placeholder")}
          className="pl-9 h-9"
          value={filters.search}
          onChange={(e) => setFilter("search", e.target.value)}
        />

        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isSearching ? 1 : 0 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {" "}
            <Loader2 className="w-4 h-4 animate-spin" />{" "}
          </motion.div>
        )}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Confederation Dropdown */}
        <ComboboxField
          name={`confederation`}
          options={confederationOptions}
          placeholder={tNation("form.placeholders.confederation")}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          value={filters.confederationId ?? null}
          onChange={(value) => setFilter("confederationId", value ?? undefined)}
        />
      </div>
    </div>
  );
};

export default NationalityFilters;
