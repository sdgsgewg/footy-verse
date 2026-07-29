import { SelectField } from "@/components/forms/fields";
import { useNationalTeams } from "@/hooks/national-teams";
import useGroupedPlayerFilter from "@/hooks/players/useGroupedPlayerFilter";
import { getNationalTeamOptions } from "@/lib/national-teams/options";
import { NationalityLookupResponse } from "@/types/nationality";

interface Props {
  nationalityLookup: NationalityLookupResponse;
}

const NationalityFilter = ({ nationalityLookup }: Props) => {
  const { filters, setFilters } = useGroupedPlayerFilter();

  const { nationalTeams } = useNationalTeams({
    nationId: nationalityLookup.id,
  });

  const nationalTeamOptions = getNationalTeamOptions(nationalTeams);

  return (
    <div>
      <SelectField
        label={`National Teams`}
        name="national_teams"
        placeholder={`Select National Team`}
        options={nationalTeamOptions}
        value={filters.nationalTeamId || ""}
        onChange={(value) => setFilters({ ...filters, nationalTeamId: value })}
      />
    </div>
  );
};

export default NationalityFilter;
