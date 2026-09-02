import { SelectField } from "@/components/forms/fields";

import { getNationalTeamOptions } from "@/lib/national-teams/options";

import type { GroupedPlayerFilter } from "@/types/player";
import { NationalTeamListItem } from "@/types/national-team";
import { useTranslations } from "next-intl";

interface Props {
  nationalTeams: NationalTeamListItem[];

  filters: GroupedPlayerFilter;

  updateFilter: <K extends keyof GroupedPlayerFilter>(
    key: K,
    value: GroupedPlayerFilter[K],
  ) => void;
}

const NationalityFilter = ({ nationalTeams, filters, updateFilter }: Props) => {
  const tLabels = useTranslations("public.nationalities.detail.filter.labels");
  const tPlaceholders = useTranslations(
    "public.nationalities.detail.filter.placeholders",
  );

  const nationalTeamOptions = getNationalTeamOptions(nationalTeams);

  return (
    <div className="w-full">
      <SelectField
        label={tLabels("nationalTeam")}
        name="national_team"
        placeholder={tPlaceholders("nationalTeam")}
        options={nationalTeamOptions}
        value={filters.nationalTeamId ?? ""}
        onChange={(value) => updateFilter("nationalTeamId", value || undefined)}
        className="max-w-48"
      />
    </div>
  );
};

export default NationalityFilter;
