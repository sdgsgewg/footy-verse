import { SelectField } from "@/components/forms/fields";
import { getClubTeamOptions } from "@/lib/club-teams/options";
import { ClubTeamListItem } from "@/types/club-team";
import { GroupedPlayerFilter } from "@/types/player";

interface Props {
  clubTeams: ClubTeamListItem[];

  filters: GroupedPlayerFilter;

  updateFilter: <K extends keyof GroupedPlayerFilter>(
    key: K,
    value: GroupedPlayerFilter[K],
  ) => void;
}

const ClubFilter = ({ clubTeams, filters, updateFilter }: Props) => {
  const clubTeamOptions = getClubTeamOptions(clubTeams);

  return (
    <div className="flex">
      <SelectField
        label={`Club Teams`}
        name="club_teams"
        placeholder={`Select Club Team`}
        options={clubTeamOptions}
        value={filters.clubTeamId || ""}
        onChange={(value) => updateFilter("clubTeamId", value || undefined)}
      />
    </div>
  );
};

export default ClubFilter;
