import { SelectField } from "@/components/forms/fields";

import { getNationalTeamOptions } from "@/lib/national-teams/options";

import type { GroupedPlayerFilter } from "@/types/player";
import { NationalTeamListItem } from "@/types/national-team";

interface Props {
  nationalTeams: NationalTeamListItem[];

  filters: GroupedPlayerFilter;

  setFilter: <K extends keyof GroupedPlayerFilter>(
    key: K,
    value: GroupedPlayerFilter[K],
  ) => void;
}

const NationalityFilter = ({ nationalTeams, filters, setFilter }: Props) => {
  const nationalTeamOptions = getNationalTeamOptions(nationalTeams);

  return (
    <div className="flex">
      <SelectField
        label="National Teams"
        name="national_teams"
        placeholder="Select National Team"
        options={nationalTeamOptions}
        value={filters.nationalTeamId ?? ""}
        onChange={(value) => setFilter("nationalTeamId", value || undefined)}
      />
    </div>
  );
};

export default NationalityFilter;
