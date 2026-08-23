"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { CompetitionImageLabel } from "@/components/shared/tables/cells";
import { ImageLabel } from "@/components/shared/tables/cells/ImageLabel";
import { CrudListPage } from "@/components/templates/crud";
import { IMAGES } from "@/constants/images";
import { Gender } from "@/enums/Gender";
import { ParticipantType } from "@/enums/ParticipantType";
import { useCrudPageTitle } from "@/hooks/common/useCrudPageTitle";
import { useCrudFilterSync } from "@/hooks/crud";
import {
  useCompetitionActions,
  useCompetitions,
} from "@/hooks/dashboard/competitions";
import useCompetitionFilter from "@/hooks/dashboard/competitions/useCompetitionFilter";
import { getParticipantTypeLabel } from "@/lib/competitions/labels";
import { getGenderLabel } from "@/lib/constants/labels";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { createSortHandler } from "@/lib/utils/crud";
import { CompetitionListItem } from "@/types/competition";
import { DataColumn } from "@/types/table";
import { useTranslations } from "next-intl";

export default function PlayersManagementPage() {
  const t = useTranslations();
  const tCommon = useTranslations("common");
  const tColumn = useTranslations("dashboard.competitions.columns");

  const { getTitle } = useCrudPageTitle();

  const {
    filters,
    debouncedFilters,
    setFilter,
    setFilters,
    goToPage,
    changeLimit,
    syncUrl,
  } = useCompetitionFilter();

  const {
    competitions,
    limit,
    totalPages,
    total,
    loading,
    retrying,
    loadError,
    retryLoad,
  } = useCompetitions({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  const { handleCreate, handleView, handleEdit, handleDelete } =
    useCompetitionActions();

  const columns: DataColumn<CompetitionListItem>[] = [
    {
      key: "name",
      label: tColumn("name"),
      className: "min-w-[16rem]",

      render: (competition) => (
        <CompetitionImageLabel
          imageUrl={competition.imageUrl}
          label={competition.name}
        />
      ),

      sortable: true,
    },

    {
      key: "category",
      label: tColumn("category"),
      render: (competition) => competition.category.name,
    },

    {
      key: "scope",
      label: tColumn("scope"),
      render: (competition) => competition.scope.name,
    },

    {
      key: "participantType",
      label: tColumn("participant"),
      render: (competition) =>
        getParticipantTypeLabel(
          competition.participantType as ParticipantType,
          t,
        ),
    },

    {
      key: "gender",
      label: tColumn("gender"),
      render: (competition) => getGenderLabel(competition.gender as Gender, t),
    },

    {
      key: "location",
      label: tColumn("location"),
      className: "min-w-[14rem]",

      render: (competition) => (
        <>
          {competition.location ? (
            <ImageLabel
              image={{
                src: competition.location.imageUrl ?? IMAGES.COMMON.DEFAULT,
                alt: competition.location.name,

                aspectRatio: "none",

                className: {
                  container: "w-8 h-8",
                  image: "object-contain",
                },
              }}
              label={competition.location.name}
            />
          ) : (
            <span>{`-`}</span>
          )}
        </>
      ),
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
      title={getTitle("list", "competition")}
      loading={loading}
      data={competitions}
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
      pagination={{
        page: filters.page,
        limit,

        totalPages,
        totalItems: total,
        loading,
        onPageChange: goToPage,
        onLimitChange: changeLimit,
      }}
    />
  );
}
