import { SelectField } from "@/components/forms/fields";
import { useClubTeams } from "@/hooks/club-teams";
import useGroupedPlayerFilter from "@/hooks/players/useGroupedPlayerFilter";
import { getClubTeamOptions } from "@/lib/club-teams/options";
import { ClubLookupResponse } from "@/types/club";
import React from "react";

interface Props {
  clubLookup: ClubLookupResponse;
}

const ClubFilter = ({ clubLookup }: Props) => {
  const { filters, setFilter, setFilters } = useGroupedPlayerFilter();

  const { clubTeams } = useClubTeams({
    clubId: clubLookup.id,
  });

  const clubTeamOptions = getClubTeamOptions(clubTeams);

  return (
    <div>
      <SelectField
        label={`Club Teams`}
        name="club_teams"
        placeholder={`Select Club Team`}
        options={clubTeamOptions}
        value={filters.clubTeamId || ""}
        onChange={(value) => setFilters({ ...filters, clubTeamId: value })}
      />
    </div>
  );
};

export default ClubFilter;
