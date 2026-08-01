import { SelectField } from "@/components/forms/fields";
import { getClubTeamOptions } from "@/lib/club-teams/options";
import { ClubTeamListItem } from "@/types/club-team";
import { GroupedPlayerFilter } from "@/types/player";

interface Props {
  clubTeams: ClubTeamListItem[];

  filters: GroupedPlayerFilter;

  setFilter: <K extends keyof GroupedPlayerFilter>(
    key: K,
    value: GroupedPlayerFilter[K],
  ) => void;
}

const ClubFilter = ({ clubTeams, filters, setFilter }: Props) => {
  const clubTeamOptions = getClubTeamOptions(clubTeams);

  return (
    <div>
      <SelectField
        label={`Club Teams`}
        name="club_teams"
        placeholder={`Select Club Team`}
        options={clubTeamOptions}
        value={filters.clubTeamId || ""}
        onChange={(value) => setFilter("clubTeamId", value || undefined)}
      />
    </div>
  );
};

export default ClubFilter;
