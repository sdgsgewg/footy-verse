import { Loader2, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { NationalityFilter } from "@/types/nationality";

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
  const tCommon = useTranslations("common");

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
    </div>
  );
};

export default NationalityFilters;
