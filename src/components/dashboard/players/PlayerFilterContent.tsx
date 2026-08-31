"use client";

import { ComboboxField } from "@/components/forms/fields";
import { useClubTeams } from "@/hooks/club-teams";
import { usePositionOptions } from "@/hooks/dashboard/positions";
import { useNationalityOptions } from "@/hooks/nationalities";
import { getClubTeamOptions } from "@/lib/club-teams/options";
import { PlayerFilter } from "@/types/player";
import { useTranslations } from "next-intl";

interface PlayerFilterContentProps {
  filters: PlayerFilter;
  updateFilter: <K extends keyof PlayerFilter>(
    key: K,
    value: PlayerFilter[K],
  ) => void;
}

export default function PlayerFilterContent({
  filters,
  updateFilter,
}: PlayerFilterContentProps) {
  const tLabels = useTranslations("dashboard.players.filter.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.players.filter.form.placeholders",
  );

  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const { positionOptions } = usePositionOptions();

  const { nationalityOptions } = useNationalityOptions();

  const { clubTeams } = useClubTeams();
  const clubTeamOptions = getClubTeamOptions(clubTeams);

  return (
    <>
      {/* Position */}
      <ComboboxField
        label={tLabels("position")}
        name={`position`}
        options={positionOptions}
        placeholder={tPlaceholders("position")}
        searchPlaceholder={tCommon("combobox.searchEntity", {
          entity: tEntities("position").toLowerCase(),
        })}
        emptyMessage={tCommon("combobox.noEntityFound", {
          entity: tEntities("position").toLowerCase(),
        })}
        value={filters.positionId || null}
        onChange={(value) => updateFilter("positionId", value)}
      />

      {/* Nationality */}
      <ComboboxField
        label={tLabels("nation")}
        name={`nation`}
        options={nationalityOptions}
        placeholder={tPlaceholders("nation")}
        searchPlaceholder={tCommon("combobox.searchEntity", {
          entity: tEntities("nationality").toLowerCase(),
        })}
        emptyMessage={tCommon("combobox.noEntityFound", {
          entity: tEntities("nationality").toLowerCase(),
        })}
        value={filters.nationId || null}
        onChange={(value) => updateFilter("nationId", value)}
      />

      {/* Club Team */}
      <ComboboxField
        label={tLabels("club")}
        name={`club_team`}
        options={clubTeamOptions}
        placeholder={tPlaceholders("club")}
        searchPlaceholder={tCommon("combobox.searchEntity", {
          entity: tEntities("club").toLowerCase(),
        })}
        emptyMessage={tCommon("combobox.noEntityFound", {
          entity: tEntities("club").toLowerCase(),
        })}
        value={filters.clubTeamId || null}
        onChange={(value) => updateFilter("clubTeamId", value)}
      />
    </>
  );
}
