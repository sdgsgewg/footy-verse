import { Loader2, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import ComboboxField from "@/components/forms/fields/ComboboxField";
import { ClubFilter } from "@/types/club";
import { useNationalityOptions } from "@/hooks/nationalities";

interface ClubFiltersProps {
  filters: ClubFilter;
  setFilter: <K extends keyof ClubFilter>(key: K, value: ClubFilter[K]) => void;
  isSearching: boolean;
}

const ClubFilters = ({ filters, setFilter, isSearching }: ClubFiltersProps) => {
  const tClub = useTranslations("dashboard.clubs");
  const tCommon = useTranslations("common");
  const tEntities = useTranslations("entities");

  const { nationalities } = useNationalityOptions();
  const nationalityOptions = nationalities;

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
        {/* Nation Dropdown */}
        <ComboboxField
          name={`nationality`}
          options={nationalityOptions}
          placeholder={tClub("form.placeholders.nation")}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          value={filters.nationId ?? null}
          onChange={(value) => setFilter("nationId", value ?? undefined)}
        />
      </div>
    </div>
  );
};

export default ClubFilters;
