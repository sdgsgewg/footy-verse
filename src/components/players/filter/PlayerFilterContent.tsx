"use client";

import { ComboboxField } from "@/components/shared/fields";
import { usePlayerFilterOptions } from "@/hooks/players";
import { PlayerFilter } from "@/types/player";
import { useTranslations } from "next-intl";

interface PlayerFilterContentProps {
  filters: PlayerFilter;
  updateFilter: <K extends keyof PlayerFilter>(
    key: K,
    value: PlayerFilter[K],
  ) => void;
  showLabel?: boolean;
}

export default function PlayerFilterContent({
  filters,
  updateFilter,
  showLabel = false,
}: PlayerFilterContentProps) {
  const tLabels = useTranslations("dashboard.players.filter.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.players.filter.form.placeholders",
  );

  const { positionOptions, nationalityOptions, clubTeamOptions, loading } =
    usePlayerFilterOptions();

  return (
    <>
      {/* Position */}
      <ComboboxField
        label={showLabel ? tLabels("position") : undefined}
        name={`position`}
        entityKey="position"
        options={positionOptions}
        placeholder={tPlaceholders("position")}
        loading={loading.position}
        value={filters.positionId || null}
        onChange={(value) => updateFilter("positionId", value)}
      />

      {/* Nationality */}
      <ComboboxField
        label={showLabel ? tLabels("nation") : undefined}
        name={`nation`}
        entityKey="nationality"
        options={nationalityOptions}
        placeholder={tPlaceholders("nation")}
        loading={loading.nationality}
        value={filters.nationId || null}
        onChange={(value) => updateFilter("nationId", value)}
      />

      {/* Club Team */}
      <ComboboxField
        label={showLabel ? tLabels("club") : undefined}
        name={`club_team`}
        entityKey="club"
        options={clubTeamOptions}
        placeholder={tPlaceholders("club")}
        loading={loading.clubTeam}
        value={filters.clubTeamId || null}
        onChange={(value) => updateFilter("clubTeamId", value)}
      />
    </>
  );
}
