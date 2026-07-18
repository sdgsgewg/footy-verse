import { Loader2, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { motion } from "framer-motion";
import { ClubFilter } from "@/hooks/clubs/useClubFilter";
import { Input } from "@/components/ui/input";
import ComboboxField from "@/components/forms/fields/ComboboxField";
import { getNationalityOptions } from "@/lib/nationalities/options";
import { useNationalities } from "@/hooks/dashboard/nationalities";
import { getClubTypeOptions } from "@/lib/clubs/options";
import SelectField from "@/components/forms/fields/SelectField";

interface ClubFiltersProps {
  filters: ClubFilter;
  setFilters: React.Dispatch<React.SetStateAction<ClubFilter>>;
  updateQuery: (filters: ClubFilter) => void;
  isSearching: boolean;
}

const ClubFilters = ({
  filters,
  setFilters,
  updateQuery,
  isSearching,
}: ClubFiltersProps) => {
  const tClub = useTranslations("dashboard.clubs");
  const tCommon = useTranslations("common");
  const tEntities = useTranslations("entities");
  const tClubType = useTranslations("dashboard.clubs.form.options.clubType");

  const { nationalities } = useNationalities();

  const nationalityOptions = getNationalityOptions(nationalities);
  const clubTypeOptions = getClubTypeOptions(tClubType);

  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* Search */}
      <div className="w-full relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={tCommon("search.placeholder")}
          className="pl-9 h-9"
          value={filters.name}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />

        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isSearching ? 1 : 0 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
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
          value={filters.nationId || null}
          onChange={(value) =>
            setFilters((prev) => {
              const updated = { ...prev, nationId: value };
              updateQuery(updated);
              return updated;
            })
          }
        />

        {/* Club Type Dropdown */}
        <SelectField
          name="club_type"
          placeholder={tClub("form.placeholders.clubType")}
          options={clubTypeOptions}
          value={filters.clubType || ""}
          onChange={(value) =>
            setFilters((prev) => {
              const updated = { ...prev, clubType: value };
              updateQuery(updated);
              return updated;
            })
          }
        />

        {/* Sort Dropdown */}
        {/* <SelectField
          name="sort"
          options={clubTypeOptions}
          value={filters.sort || ""}
          onChange={(value) => setFilters({ ...filters, sort: value })}
        /> */}
      </div>
    </div>
  );
};

export default ClubFilters;
