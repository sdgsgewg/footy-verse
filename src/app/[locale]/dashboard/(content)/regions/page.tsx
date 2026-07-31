"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";
import { CrudListPage } from "@/components/templates/crud";
import { DataColumn } from "@/types/table";
import { createSortHandler } from "@/lib/utils/crud";
import { useCrudFilterSync } from "@/hooks/crud";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import useRegionFilter from "@/hooks/dashboard/regions/useRegionFilter";
import { useRegionActions, useRegions } from "@/hooks/dashboard/regions";
import { RegionListItem } from "@/types/region";
import { getRegionTypeLabel } from "@/lib/regions/labels";
import { RegionType } from "@/enums/RegionType";
import { RegionImageLabel } from "@/components/shared/tables/cells";

export default function Page() {
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.regions.columns");
  const tRegionType = useTranslations(
    "dashboard.regions.form.options.regionType",
  );

  const { getTitle } = useCrudPageTitle();

  const { filters, debouncedFilters, setFilter, setFilters, syncUrl } =
    useRegionFilter();

  const { regions, loading, loadError, retrying, retryLoad } = useRegions({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  const { handleCreate, handleView, handleEdit, handleDelete } =
    useRegionActions();

  const columns: DataColumn<RegionListItem>[] = [
    {
      key: "name",
      label: tColumn("name"),
      className: "min-w-[300px]",

      render: (region) => (
        <RegionImageLabel imageUrl={region.imageUrl} label={region.name} />
      ),

      sortable: true,
    },

    {
      key: "regionType",
      label: tColumn("regionType"),
      className: "min-w-[300px]",
      render: (region) =>
        getRegionTypeLabel(region.regionType as RegionType, tRegionType),
      sortable: true,
    },

    {
      key: "parentRegion",
      label: tColumn("parentRegion"),

      render: (region) => (
        <>
          {region.parentRegion || region.parentRegion !== null ? (
            <RegionImageLabel
              imageUrl={region.parentRegion.imageUrl}
              label={region.parentRegion.name}
            />
          ) : (
            <span>-</span>
          )}
        </>
      ),

      className: "min-w-[200px]",
    },
  ];

  const handleSort = createSortHandler({
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    setFilters,
  });

  // Sync URL on filter
  useCrudFilterSync(debouncedFilters, syncUrl);

  return (
    <CrudListPage
      title={getTitle("list", "region")}
      loading={loading}
      data={regions}
      columns={columns}
      headerContent={
        isLikelyConnectionError(loadError) ? (
          <ConnectionErrorAlert retrying={retrying} onRetry={retryLoad} />
        ) : undefined
      }
      actions={{
        onCreate: handleCreate,
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDelete,
      }}
      toolbar={{
        searchValue: filters.search,
        searchPlaceholder: tCommon("search.placeholder"),
        onSearchChange: (value) => setFilter("search", value),
      }}
      sorting={{
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSort: handleSort,
      }}
    />
  );
}
